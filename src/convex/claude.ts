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

// ─── New: Problem classification action ──────────────────────────────────────

/** Classify a user's natural-language business problem into a workflow recommendation. */
export const classifyProblem = action({
  args: {
    userProblem: v.string(),
    model: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const client = await getClaudeClient();

    const systemPrompt = `You are a marketing workflow classifier for the Claude Marketing Lab.
Your job is to take a user's natural-language business problem and classify it into the best-matching workflow.

You MUST respond with valid JSON only. No markdown, no explanation outside the JSON.

Available workflows (use the exact id):
- "customer-research" — Understanding customer needs, pain points, preferences
- "review-analysis" — Analyzing customer reviews for sentiment and patterns
- "competitor-analysis" — Researching competitor positioning, strategy, features
- "product-comparison" — Comparing products feature-for-feature
- "campaign-analysis-competitor" — Analyzing a competitor's campaign
- "market-trends" — Researching market trends and signals
- "product-opportunity" — Identifying product opportunities from gaps
- "feature-opportunity" — Evaluating whether to build a specific feature
- "product-positioning" — Developing product positioning strategy
- "launch-timing" — Deciding when to launch a product
- "campaign-planning" — Planning a marketing campaign
- "copywriting" — Writing marketing copy
- "ad-creation" — Creating advertising content
- "instagram-content" — Creating Instagram content
- "youtube-content" — Creating YouTube content
- "website-copy" — Writing website copy
- "email-marketing" — Creating email campaigns
- "campaign-analysis" — Analyzing campaign performance
- "ab-testing" — Planning A/B tests
- "sales-insights" — Analyzing sales data and trends
- "cost-analysis" — Analyzing marketing costs
- "campaign-optimization" — Optimizing campaign performance
- "weekly-intelligence" — Weekly marketing intelligence digest
- "marketing-routine" — Setting up recurring marketing workflows
- "customer-complaint-analysis" — Analyzing customer complaints and issues
- "product-launch-planning" — Planning a product launch
- "sales-decline-investigation" — Investigating why sales are declining

Respond with this exact JSON structure:
{
  "category": "Research" | "Strategy" | "Marketing" | "Sales" | "Product" | "Customer" | "Content" | "Performance" | "Operations",
  "matchedUseCaseId": "the exact workflow id",
  "matchedUseCaseTitle": "the workflow title",
  "matchedReason": "one sentence explaining why this workflow matches",
  "recommendedSkill": "the skill name that fits best",
  "requiredInformation": ["list of 3-5 key pieces of information needed"],
  "recommendedConnectors": ["list of 2-4 recommended data sources"],
  "confidence": "high" | "medium" | "low"
}`;

    const response = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.3,
      system: systemPrompt,
      messages: [{ role: "user", content: args.userProblem }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const text = textBlock?.text ?? "{}";

    let parsed: Record<string, unknown>;
    try {
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[1] : text);
    } catch {
      parsed = {};
    }

    return {
      category: String(parsed.category ?? "Research"),
      matchedUseCaseId: String(parsed.matchedUseCaseId ?? "competitor-analysis"),
      matchedUseCaseTitle: String(parsed.matchedUseCaseTitle ?? "Analysis"),
      matchedReason: String(parsed.matchedReason ?? "Best match based on the problem description."),
      recommendedSkill: String(parsed.recommendedSkill ?? "Marketing Research Analyst"),
      requiredInformation: Array.isArray(parsed.requiredInformation) ? parsed.requiredInformation.map(String) : [],
      recommendedConnectors: Array.isArray(parsed.recommendedConnectors) ? parsed.recommendedConnectors.map(String) : [],
      confidence: ["high", "medium", "low"].includes(String(parsed.confidence)) ? parsed.confidence : "medium",
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  },
});

// ─── New: Structured output generation ───────────────────────────────────────

/** Generate a structured analysis result that can be fed directly to OutputRenderer. */
export const generateStructuredOutput = action({
  args: {
    useCaseId: v.string(),
    useCaseTitle: v.string(),
    useCaseDescription: v.string(),
    prompt: v.string(),
    visualOutputType: v.string(),
    evidenceNeeded: v.array(v.string()),
    model: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const client = await getClaudeClient();

    const outputTypeGuide = `The output type requested is: ${args.visualOutputType}

Based on the output type, return the appropriate JSON structure:

For "messagingBreakdown":
{ "kind": "messagingBreakdown", "competitor": string, "messaging": string, "audience": string, "positioning": string, "whatsNew": string, "inference": string }

For "comparisonMatrix":
{ "kind": "comparisonMatrix", "competitors": [{ "name": string, "price": string, "features": string[], "complaints": string[], "strengths": string[] }], "summary": string }

For "themeClusters":
{ "kind": "themeClusters", "themes": [{ "title": string, "description": string, "count": number, "confidence": string }], "sentiment": { "positive": string, "negative": string, "mixed": string } }

For "opportunityCard":
{ "kind": "opportunityCard", "opportunity": string, "evidence": string[], "customerNeed": string, "competitiveContext": string, "potentialBenefit": string, "risks": string[], "questions": string[], "nextInvestigation": string }

For "campaignCanvas":
{ "kind": "campaignCanvas", "insight": string, "message": string, "audience": string, "channels": string[], "cta": string, "metrics": string[] }

For "dashboard":
{ "kind": "dashboard", "metrics": [{ "name": string, "value": string, "change": string, "trend": "up" | "down" | "flat" }], "whatWorked": string[], "whatDidNot": string[], "nextTest": string }

For "evidenceSplit":
{ "kind": "evidenceSplit", "supporting": string[], "conflicting": string[], "confidenceRead": string }

For "positioningCards":
{ "kind": "positioningCards", "angles": [{ "angle": string, "evidence": string, "differentiation": string, "risks": string }] }

For "launchTimeline":
{ "kind": "launchTimeline", "recommendedWindow": string, "reasons": string[], "risks": string[], "assumptions": string[], "openQuestions": string[] }

For "featureScorecard":
{ "kind": "featureScorecard", "feature": string, "mentionCount": number, "competitorPresence": string, "forPoints": string[], "againstPoints": string[] }

For "diagnosisCard":
{ "kind": "diagnosisCard", "diagnosis": string, "confidence": string, "experiment": string, "expectedImpact": string, "measurementPlan": string }

For any other type, generate a reasonable structure matching the kind field.`;

    const systemPrompt = `You are an expert marketing AI assistant generating structured analysis output.

CRITICAL RULES:
1. You MUST respond with valid JSON only. No markdown, no explanation outside the JSON.
2. Use the fictional luggage company "Voyara" as example context where needed.
3. All data is SIMULATED / DEMONSTRATION DATA for educational purposes.
4. Never fabricate real company statistics.
5. Frame outputs as decision support, not autonomous decisions.
6. Separate evidence from interpretation.

${outputTypeGuide}`;

    const userPrompt = `## Workflow: ${args.useCaseTitle}
## Business Problem: ${args.useCaseDescription}
## Evidence available: ${args.evidenceNeeded.join(", ")}

## Prompt that was sent to Claude:
${args.prompt}

---

Generate the structured JSON output for this analysis. Return ONLY the JSON object, nothing else.`;

    const response = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const text = textBlock?.text ?? "{}";

    let output;
    try {
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      output = JSON.parse(jsonMatch ? jsonMatch[1] : text);
    } catch {
      output = {
        kind: args.visualOutputType,
        messaging: text.slice(0, 500),
        competitor: "Competitor",
        audience: "Target audience",
        positioning: "Market positioning",
        whatsNew: "Analysis generated by Claude",
        inference: "Based on available evidence",
      };
    }

    // Generate derived business insight in a second call
    const insightPrompt = `Based on this marketing analysis, provide:
1. A one-paragraph business insight (2-3 sentences)
2. Exactly 3 key findings (one sentence each)
3. Exactly 2 recommended actions with labels and descriptions
4. A one-sentence human review note

Analysis output:
${JSON.stringify(output).slice(0, 2000)}

Respond with valid JSON:
{
  "businessInsight": string,
  "keyFindings": [string, string, string],
  "recommendedActions": [{ "label": string, "description": string }, { "label": string, "description": string }],
  "humanReviewNotes": string
}`;

    const insightResponse = await client.messages.create({
      model: args.model ?? "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.5,
      system: "You are a marketing strategy analyst. Respond with valid JSON only.",
      messages: [{ role: "user", content: insightPrompt }],
    });

    const insightText = insightResponse.content.find((b) => b.type === "text")?.text ?? "{}";
    let insightData: Record<string, unknown>;
    try {
      const jsonMatch = insightText.match(/```(?:json)?\s*([\s\S]*?)```/);
      insightData = JSON.parse(jsonMatch ? jsonMatch[1] : insightText);
    } catch {
      insightData = {};
    }

    return {
      output,
      businessInsight: String(insightData.businessInsight ?? "Analysis complete. Review the findings above."),
      keyFindings: Array.isArray(insightData.keyFindings) ? insightData.keyFindings.map(String) : ["Analysis generated", "Review findings", "Validate with real data"],
      recommendedActions: Array.isArray(insightData.recommendedActions)
        ? insightData.recommendedActions.map((a: Record<string, string>) => ({ label: String(a?.label ?? "Review"), description: String(a?.description ?? "Review the analysis") }))
        : [{ label: "Review Findings", description: "Validate the analysis with your team" }],
      humanReviewNotes: String(insightData.humanReviewNotes ?? "Verify all findings before taking action."),
      model: response.model,
      inputTokens: response.usage.input_tokens + insightResponse.usage.input_tokens,
      outputTokens: response.usage.output_tokens + insightResponse.usage.output_tokens,
    };
  },
});
