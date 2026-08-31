// ─── AI Service Layer ───────────────────────────────────────────────────────
/**
 * Two modes of operation:
 *
 * 1. SIMULATED (default) — high-quality canned responses, no API calls.
 *    Always works, clearly labeled as demo data in the UI.
 *
 * 2. LIVE — calls Claude via the Convex action in src/convex/claude.ts.
 *    Requires ANTHROPIC_API_KEY to be set in Convex env vars.
 *    Falls back to simulated if the key is missing or the call fails.
 *
 * The consumer (UseCaseEngine) doesn't need to know which mode is active —
 * both return the same `RunResult` shape.
 */

import { api } from "../convex/_generated/api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RunResult {
  ok: true;
  durationMs: number;
}

export interface GenerateResult {
  text: string;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  source: "live" | "simulated";
}

// ─── Configuration ──────────────────────────────────────────────────────────

/** Set to true to prefer live Claude calls; false forces simulated. */
let _preferLive = false; // Set to true when ANTHROPIC_API_KEY is configured in Convex env vars

export function setPreferLive(prefer: boolean) {
  _preferLive = prefer;
}

export function isPreferLive() {
  return _preferLive;
}

// ─── Simulated responses ────────────────────────────────────────────────────

const MIN_DELAY = 1400;
const MAX_DELAY = 2200;

export function runWorkflow(): Promise<RunResult> {
  const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ ok: true, durationMs: Math.round(delay) }), delay),
  );
}

export const RUN_STAGES = [
  "Reading inputs…",
  "Applying skill stages…",
  "Cross-checking evidence…",
  "Quality check…",
  "Formatting output…",
];

// ─── Live Claude generation ─────────────────────────────────────────────────

/**
 * Call Claude via the Convex server-side action.
 * Falls back to simulated on any error (network, auth, quota, etc.)
 */
export async function generateWithClaude(args: {
  useCaseId: string;
  useCaseTitle: string;
  useCaseDescription: string;
  stepLabel: string;
  stepInstructions: string;
  additionalContext?: string;
}): Promise<GenerateResult> {
  if (!_preferLive) {
    return simulateGenerate(args);
  }

  try {
    // @ts-expect-error — Convex action path resolved at runtime via codegen
    const result = await api.claude.generateWorkflowAnalysis({
      useCaseId: args.useCaseId,
      useCaseTitle: args.useCaseTitle,
      useCaseDescription: args.useCaseDescription,
      stepLabel: args.stepLabel,
      stepInstructions: args.stepInstructions,
      additionalContext: args.additionalContext,
    });

    return {
      text: result.text,
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      source: "live",
    };
  } catch (err) {
    console.warn(
      "[ai-engine] Live Claude call failed, falling back to simulated:",
      err,
    );
    return simulateGenerate(args);
  }
}

/**
 * Generic completion — send any system+user prompt to Claude.
 */
export async function completeWithClaude(args: {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<GenerateResult> {
  if (!_preferLive) {
    return simulateGenerate(args);
  }

  try {
    // @ts-expect-error — Convex action path resolved at runtime via codegen
    const result = await api.claude.complete({
      systemPrompt: args.systemPrompt,
      userPrompt: args.userPrompt,
      maxTokens: args.maxTokens,
      temperature: args.temperature,
    });

    return {
      text: result.text,
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      source: "live",
    };
  } catch (err) {
    console.warn(
      "[ai-engine] Live Claude call failed, falling back to simulated:",
      err,
    );
    return simulateGenerate(args);
  }
}

// ─── Simulated fallback ─────────────────────────────────────────────────────

function simulateGenerate(
  _args: Record<string, unknown>,
): Promise<GenerateResult> {
  const delay = 800 + Math.random() * 1200;
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        text: generateSimulatedResponse(_args),
        source: "simulated",
      });
    }, delay),
  );
}

function generateSimulatedResponse(args: Record<string, unknown>): string {
  const title = String(args.useCaseTitle ?? "Marketing Analysis");
  const step = String(args.stepLabel ?? "Analysis");

  return `## ${step} — ${title}

### Key Findings

Based on publicly available information and market signals, the following patterns have been identified:

1. **Customer sentiment** — Recurring themes in customer discussions emphasize convenience, durability, and travel experience rather than technical specifications.

2. **Competitive positioning** — Competitors are increasingly framing products around lifestyle benefits rather than feature lists.

3. **Market opportunity** — A gap exists between customer expectations for premium travel solutions and current market messaging.

### Evidence Summary

| Signal | Evidence Type | Confidence |
|--------|--------------|------------|
| Customer pain points | Public reviews & comments | High |
| Competitor messaging | Public campaign analysis | High |
| Market trend | Industry reports | Medium |

### Interpretation

The data suggests an opportunity to reposition product messaging around the travel experience rather than purely on product specifications.

### Recommended Next Actions

- Test campaign messaging focused on travel convenience
- Survey existing customers on feature priorities
- Benchmark competitor messaging themes
- Develop 2-3 creative concepts for A/B testing

> **Note:** This is SIMULATED / DEMONSTRATION DATA for learning purposes. Real-world decisions should be validated with actual connected data sources.

---
*Generated by Claude Marketing Lab — ${new Date().toLocaleDateString()}*`;
}

// ─── Live classification ─────────────────────────────────────────────────────

/**
 * Classify a user's natural-language business problem.
 * Calls the Convex server action, falls back to null on failure.
 */
export async function classifyProblem(userProblem: string): Promise<import("@/lib/lab-types").ClassifiedProblem | null> {
  if (!_preferLive) return null;

  try {
    // @ts-expect-error — Convex action path resolved at runtime via codegen
    const result = await api.claude.classifyProblem({ userProblem });
    return {
      category: result.category as import("@/lib/lab-types").Category,
      matchedUseCaseId: result.matchedUseCaseId,
      matchedUseCaseTitle: result.matchedUseCaseTitle,
      matchedReason: result.matchedReason,
      recommendedSkill: result.recommendedSkill,
      requiredInformation: result.requiredInformation,
      recommendedConnectors: result.recommendedConnectors,
      confidence: result.confidence,
      source: "live",
    };
  } catch (err) {
    console.warn("[ai-engine] classifyProblem failed:", err);
    return null;
  }
}

// ─── Live structured output generation ────────────────────────────────────────

/**
 * Generate a full structured analysis result.
 * Returns output + business insight + actions — all derived from a single Claude call.
 * Falls back to null on failure (caller should use static data).
 */
export async function generateLiveAnalysis(args: {
  useCaseId: string;
  useCaseTitle: string;
  useCaseDescription: string;
  prompt: string;
  visualOutputType: string;
  evidenceNeeded: string[];
}): Promise<import("@/lib/lab-types").LiveAnalysisResult | null> {
  if (!_preferLive) return null;

  try {
    // @ts-expect-error — Convex action path resolved at runtime via codegen
    const result = await api.claude.generateStructuredOutput({
      useCaseId: args.useCaseId,
      useCaseTitle: args.useCaseTitle,
      useCaseDescription: args.useCaseDescription,
      prompt: args.prompt,
      visualOutputType: args.visualOutputType,
      evidenceNeeded: args.evidenceNeeded,
    });

    return {
      output: result.output as import("@/lib/lab-types").UseCaseOutput,
      businessInsight: result.businessInsight,
      keyFindings: result.keyFindings,
      recommendedActions: result.recommendedActions,
      humanReviewNotes: result.humanReviewNotes,
      source: "live",
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    };
  } catch (err) {
    console.warn("[ai-engine] generateLiveAnalysis failed:", err);
    return null;
  }
}
