// ─── Simulated AI service layer ──────────────────────────────────────────────
/**
 * Clean seam for a future live integration: swap `runWorkflow`'s body with a
 * real API call (e.g. an HTTP action hitting a Claude-backed backend) while
 * every component keeps the same interface.
 *
 * IMPORTANT: all responses are high-quality SIMULATED outputs, clearly labeled
 * as sample/demo data in the UI. No fake network calls are made.
 */

export interface RunResult {
  ok: true;
  durationMs: number;
}

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
