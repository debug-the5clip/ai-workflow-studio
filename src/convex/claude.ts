"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Claude API integration — server-side Convex actions.
 *
 * The Anthropic API key lives as a Convex secret, never exposed to the browser.
 * Set these in Convex dashboard → Settings → Environment Variables:
 *   ANTHROPIC_API_KEY  – your Anthropic API key (sk-ant-...)
 *
 * Model defaults to claude-sonnet-4-20250514 (best balance of quality + speed).
 * Override via the optional `model` argument.
 */

// ─── internal helper ────────────────────────────────────────────────────────

async function getClaudeClient() {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Claude API is not configured. Add ANTHROPIC_API_KEY to your Convex " +
        "environment variables (Settings → Environment Variables).",
    );
  }

  return new Anthropic({ apiKey });
}

// ─── exported actions ───────────────────────────────────────────────────────

/** Send a single prompt to Claude and return the text response. */
export const complete = action({
  args: {
    systemPrompt: v.string(),
    userPrompt: v.string(),
    model: v.optional(v.string()),
    maxTokens: v.optional(v.number()),
    temperature: v.optional(v.number()),
  },
  handler: async (_ctx, args) => {
    const client = await getClaudeClient();

    const response = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: args.maxTokens ?? 2048,
      temperature: args.temperature ?? 0.7,
      system: args.systemPrompt,
      messages: [{ role: "user", content: args.userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return {
      text: textBlock?.text ?? "",
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  },
});

/** Generate a structured workflow analysis for a marketing use case. */
export const generateWorkflowAnalysis = action({
  args: {
    useCaseId: v.string(),
    useCaseTitle: v.string(),
    useCaseDescription: v.string(),
    stepLabel: v.string(),
    stepInstructions: v.string(),
    additionalContext: v.optional(v.string()),
    model: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const client = await getClaudeClient();

    const systemPrompt = `You are an expert marketing AI assistant embedded in the Claude Marketing Lab.
You help marketing professionals understand and solve real business problems.

Rules:
- Be specific, practical, and marketing-oriented.
- Use the fictional luggage company "Voyara" as the example context.
- All data you reference is SIMULATED / DEMONSTRATION DATA.
- Structure your response with clear headers and bullet points.
- Keep responses concise but actionable (aim for 400-800 words).
- Never fabricate real company statistics or results.
- Frame AI outputs as decision support, not autonomous decisions.`;

    const userPrompt = `
## Use Case
${args.useCaseTitle}

## Business Problem
${args.useCaseDescription}

## Current Workflow Step
${args.stepLabel}

## What this step needs
${args.stepInstructions}
${args.additionalContext ? `\n## Additional context\n${args.additionalContext}` : ""}

---

Generate a detailed, practical response for this workflow step. Structure it as a professional marketing deliverable.
`;

    const response = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: 2048,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return {
      text: textBlock?.text ?? "",
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  },
});

/** Streamable batch — run multiple workflow steps in one call. */
export const batchSteps = action({
  args: {
    steps: v.array(
      v.object({
        label: v.string(),
        instructions: v.string(),
      }),
    ),
    useCaseTitle: v.string(),
    useCaseDescription: v.string(),
    model: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const client = await getClaudeClient();

    const systemPrompt = `You are an expert marketing AI assistant in the Claude Marketing Lab.
For each step below, generate a concise, practical response (200-400 words each).
Use the fictional luggage company "Voyara" as context.
All data is SIMULATED / DEMONSTRATION DATA.
Structure each response with clear headers.`;

    const stepsText = args.steps
      .map(
        (s, i) =>
          `### Step ${i + 1}: ${s.label}\n${s.instructions}`,
      )
      .join("\n\n");

    const userPrompt = `
## Use Case: ${args.useCaseTitle}
## Problem: ${args.useCaseDescription}

## Steps to analyze:
${stepsText}

---

Generate a response for each step above. Separate each step response with "---".
`;

    const response = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return {
      text: textBlock?.text ?? "",
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  },
});
