// ─── Core types for Claude Marketing Lab ─────────────────────────────────────

export type Category = "Research" | "Strategy" | "Marketing" | "Sales" | "Product" | "Customer" | "Content" | "Performance" | "Operations";

export type CapabilityLabel = "Prompt" | "Skill" | "Connector" | "Loop" | "Routine";

export type SourceType = "connector" | "public" | "sample";

export interface SourceCard {
  id: string;
  name: string;
  type: SourceType;
  label: string; // "CLAUDE CONNECTOR" | "PUBLIC WEB SOURCE" | "SAMPLE DATA"
  icon: string; // emoji or icon name
  description: string;
  marketersUseFor: string;
  example: string;
  official?: boolean;
  url?: string;
}

export interface SkillCard {
  id: string;
  name: string;
  tag: "OFFICIAL" | "EXAMPLE";
  purpose: string;
  whenToUse: string;
  input: string;
  process: string[];
  output: string;
  marketingExample: string;
  samplePrompt: string;
  recommendedConnector: string;
  why: string;
}

export interface ConnectorCard {
  id: string;
  name: string;
  tag: "CLAUDE CONNECTOR" | "PUBLIC WEB SOURCE" | "EXAMPLE MARKETING CHANNEL" | "INTERNAL BUSINESS DATA (SAMPLE)";
  icon: string;
  whatItGivesClaude: string;
  marketersUseFor: string;
  example: string;
  official?: boolean;
  url?: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  screenTitle: string;
  explanation: string;
  /** Legacy compat: maps to screenTitle */
  question?: string;
  /** Legacy compat: maps to explanation */
  answer?: string;
}

export interface ReviewCheckItem {
  text: string;
}

export interface NextAction {
  label: string;
  description: string;
}

export interface OutputCard {
  title: string;
  body: string;
}

export type VisualOutputType =
  | "themeClusters"
  | "comparisonMatrix"
  | "opportunityCard"
  | "campaignCanvas"
  | "adPreview"
  | "socialPreview"
  | "emailPreview"
  | "dashboard"
  | "circularWorkflow"
  | "weeklyCalendar"
  | "launchTimeline"
  | "abComparison"
  | "diagnosisCard"
  | "featureScorecard"
  | "positioningCards"
  | "evidenceSplit"
  | "messagingBreakdown"
  | "costEfficiency"
  | "salesTimeline"
  | "weeklyDigest"
  | "routineCalendar";

export interface ConnectorDetail {
  name: string;
  icon: string;
  status: "connected" | "connected-simulated" | "not-connected" | "available";
  whatItProvides: string;
  whyRecommended: string;
  category: string;
}

export interface SkillDetail {
  name: string;
  category: string;
  purpose: string;
  whenToUse: string;
  requiredInputs: string;
  outputs: string;
  whyRecommended: string;
}

export interface SecurityClassification {
  level: "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "SENSITIVE";
  dataNeeded: string[];
  dataNotNeeded: string[];
  guardrails: string[];
  explanation: string;
}

export interface HumanReview {
  required: boolean;
  aiCanDo: string[];
  humanApprovalFor: string[];
  explanation: string;
}

export interface BusinessValue {
  keyFindings: string[];
  businessInsight: string;
  recommendedAction: string;
  valueStatement: string;
}

export interface DemoFinding {
  finding: string;
  evidence: string;
  interpretation: string;
  confidence: "high" | "medium" | "low";
}

export interface DemoResult {
  executiveSummary: string;
  findings: DemoFinding[];
  businessInsight: string;
  recommendedActions: string[];
  doubleCheck: string[];
}

export interface UseCase {
  id: string;
  title: string;
  emoji: string;
  category: Category;
  scenario: string;
  goal: string;
  steps: WorkflowStep[];
  evidenceNeeded: string[];
  sources: SourceCard[];
  capability: string;
  capabilityReason: string;
  prompt: string;
  promptBreakdown: { label: string; text: string; color: string }[];
  whyPromptWorks: string;
  outputDescription: string;
  visualOutputType: VisualOutputType;
  sampleData?: unknown;
  reviewChecklist: string[];
  nextActions: NextAction[];
  loopTip: string;
  repeatability: string;
  estimatedTime: string;
  /** Extended MVP fields */
  connectorDetails?: ConnectorDetail[];
  skillDetails?: SkillDetail;
  securityClassification?: SecurityClassification;
  humanReview?: HumanReview;
  businessValue?: BusinessValue;
  demoResult?: DemoResult;
  /** Legacy compat */
  summary?: string;
  output?: { kind: string; [k: string]: unknown };
}

/** Union type for visual output rendering */
export type UseCaseOutput =
  | { kind: "themeClusters"; themes: { title: string; description: string; count: number; confidence: string }[]; sentiment?: { positive: string; negative: string; mixed: string } }
  | { kind: "comparisonMatrix"; competitors: { name: string; price: string; features: string[]; complaints: string[]; strengths: string[] }[]; summary: string }
  | { kind: "opportunityCard"; opportunity: string; evidence: string[]; customerNeed: string; competitiveContext: string; potentialBenefit: string; risks: string[]; questions: string[]; nextInvestigation: string }
  | { kind: "campaignCanvas"; insight: string; message: string; audience: string; channels: string[]; cta: string; metrics: string[] }
  | { kind: "adPreview"; variations: { headline: string; body: string; cta: string }[] }
  | { kind: "socialPreview"; posts: { platform: string; caption: string; hashtags: string[]; visualDirection: string }[] }
  | { kind: "emailPreview"; subject: string; preheader: string; body: string; cta: string; reasoning: { audience: string; objective: string; message: string; tone: string; ctaReason: string } }
  | { kind: "dashboard"; metrics: { name: string; value: string; change: string; trend: "up" | "down" | "flat" }[]; whatWorked: string[]; whatDidNot: string[]; nextTest: string }
  | { kind: "abComparison"; variantA: { label: string; result: string }; variantB: { label: string; result: string }; hypothesis: string; nextTest: string }
  | { kind: "diagnosisCard"; diagnosis: string; confidence: string; experiment: string; expectedImpact: string; measurementPlan: string }
  | { kind: "featureScorecard"; feature: string; mentionCount: number; competitorPresence: string; forPoints: string[]; againstPoints: string[] }
  | { kind: "positioningCards"; angles: { angle: string; evidence: string; differentiation: string; risks: string }[] }
  | { kind: "evidenceSplit"; supporting: string[]; conflicting: string[]; confidenceRead: string }
  | { kind: "messagingBreakdown"; competitor: string; messaging: string; audience: string; positioning: string; whatsNew: string; inference: string }
  | { kind: "launchTimeline"; recommendedWindow: string; reasons: string[]; risks: string[]; assumptions: string[]; openQuestions: string[] }
  | { kind: "costEfficiency"; rankings: { channel: string; spend: string; efficiency: string; investigation: string }[] }
  | { kind: "salesTimeline"; associations: { campaign: string; correlation: string; confidence: string; caveat: string }[] }
  | { kind: "weeklyDigest"; sections: { area: string; whatsNew: string[]; whatToWatch: string[]; recommendedAction: string }[] }
  | { kind: "routineCalendar"; days: { day: string; task: string; skill: string; connector: string; owner: string }[] };

export interface QuizQuestion {
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

export interface FlashCard {
  term: string;
  back: string;
  whyItMatters: string;
  icon: string;
}

export interface CalendarEntry {
  day: string;
  task: string;
  skill: string;
  connector: string;
}

// ─── Live Claude integration types ───────────────────────────────────────────

/** Response from the classifyProblem server action */
export interface ClassifiedProblem {
  category: Category;
  matchedUseCaseId: string;
  matchedUseCaseTitle: string;
  matchedReason: string;
  recommendedSkill: string;
  requiredInformation: string[];
  recommendedConnectors: string[];
  confidence: "high" | "medium" | "low";
  source: "live" | "simulated";
}

/** Full analysis result returned by the generateStructuredOutput action */
export interface LiveAnalysisResult {
  /** The structured output that can be fed directly to OutputRenderer */
  output: UseCaseOutput;
  /** Derived business insight for Step 8 */
  businessInsight: string;
  /** Key findings extracted from the analysis */
  keyFindings: string[];
  /** Recommended actions for Step 9 */
  recommendedActions: NextAction[];
  /** Human review notes for Step 10 */
  humanReviewNotes: string;
  /** Source of the result */
  source: "live" | "simulated";
  /** Model used (if live) */
  model?: string;
  /** Token usage (if live) */
  inputTokens?: number;
  outputTokens?: number;
}
