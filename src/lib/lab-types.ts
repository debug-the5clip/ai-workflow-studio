// ─── Core domain types for Claude Marketing Lab ──────────────────────────────

export type OutputKind =
  | "competitorDashboard"
  | "themes"
  | "scorecard"
  | "campaignCanvas"
  | "copyLab"
  | "emailPreview"
  | "socialBoard"
  | "analytics"
  | "experiment"
  | "insights"
  | "positioning"
  | "calendar";

export interface WorkflowStep {
  /** Short step label, e.g. "Business Question" */
  title: string;
  /** The guiding question shown in the wizard */
  question: string;
  /** Pre-written expert answer / configuration for this fictional scenario */
  answer: string;
}

export interface InsightCard {
  title: string;
  body: string;
  tone?: "positive" | "neutral" | "risk";
}

export interface CompetitorRow {
  name: string;
  positioning: string;
  priceTier: "Budget" | "Mid" | "Premium";
  signatureFeature: string;
  messaging: string;
}

export interface ThemeCluster {
  theme: string;
  share: number; // % of mentions
  sentiment: "positive" | "negative" | "mixed";
  quote: string;
}

export interface ScorecardField {
  label: string;
  value: string;
}

export interface CampaignPiece {
  kind: string;
  title: string;
  body: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  delta: number; // % change vs previous period
  good: boolean;
}

export interface SocialPost {
  platform: "Instagram" | "YouTube" | "Short-form" | "Campaign caption" | "CTA";
  headline: string;
  body: string;
}

export interface CalendarEntry {
  day: string;
  focus: string;
  blocks: string[]; // building blocks used
}

export type UseCaseOutput =
  | { kind: "competitorDashboard"; competitors: CompetitorRow[]; strengths: string[]; gaps: string[]; opportunities: string[]; investigate: string[] }
  | { kind: "themes"; headline: string; themes: ThemeCluster[]; pains: string[]; needs: string[] }
  | { kind: "scorecard"; title: string; fields: ScorecardField[]; disclaimer: string }
  | { kind: "campaignCanvas"; concept: string; pieces: CampaignPiece[] }
  | { kind: "copyLab"; platform: string; goal: string; tone: string; variants: { angle: string; copy: string }[] }
  | { kind: "emailPreview"; subject: string; preheader: string; audience: string; objective: string; body: string[]; cta: string; whyItWorks: string[] }
  | { kind: "socialBoard"; posts: SocialPost[] }
  | { kind: "analytics"; disclaimer: string; metrics: AnalyticsMetric[]; worked: string[]; didnt: string[]; reasons: string[]; testNext: string[] }
  | { kind: "experiment"; hypothesis: string; change: string; measure: string; successCriteria: string; timeline: string }
  | { kind: "insights"; headline: string; cards: InsightCard[] }
  | { kind: "positioning"; axes: { x: string; y: string }; points: { name: string; x: number; y: number; ours?: boolean }[]; takeaway: string }
  | { kind: "calendar"; entries: CalendarEntry[] };

export interface UseCase {
  id: string;
  emoji: string;
  title: string;
  category: "Research" | "Create" | "Optimize" | "Operate";
  summary: string;
  /** The ten-step immersive workflow */
  steps: WorkflowStep[];
  /** Full copy-pasteable sample prompt */
  prompt: string;
  output: UseCaseOutput;
  reviewChecklist: string[];
  actions: { label: string; description: string }[];
  loopTip: string;
}
