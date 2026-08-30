// ─── Skill Ecosystem Catalogue ───────────────────────────────────────────────
/**
 * Structured skill definitions for the AI Workflow Studio.
 * Each skill defines its purpose, when to use it, inputs, outputs,
 * and compatible connector categories.
 */

import type { SkillDetail } from "@/lib/lab-types";

export const SKILL_CATEGORIES = [
  {
    id: "research",
    label: "Research",
    icon: "🔎",
    skills: [
      { name: "Market Research Analyst", purpose: "Identify market trends, validate signals, and assess market direction", whenToUse: "When exploring a new market signal, validating a trend, or assessing market conditions", requiredInputs: "Industry articles, search trends, market reports, public data", outputs: "Ranked market signals with confidence levels and source citations", compatibleConnectors: ["research", "documents"], whyRecommended: "Provides structured methodology for market intelligence gathering and validation" },
      { name: "Competitor Intelligence Analyst", purpose: "Compare competitor positioning, messaging, features, and identify gaps", whenToUse: "When analyzing competitor strategy, positioning, or product offerings", requiredInputs: "Competitor pages, public reviews, marketing materials, product specs", outputs: "Competitive comparison matrix with positioning map and gap analysis", compatibleConnectors: ["research", "documents"], whyRecommended: "Ensures consistent, evidence-based competitive analysis with clear source attribution" },
      { name: "Trend Researcher", purpose: "Detect emerging trends, assess their maturity, and predict trajectory", whenToUse: "When evaluating whether a trend is worth investing in", requiredInputs: "Search trend data, news coverage, industry reports, social signals", outputs: "Trend assessment with maturity level, trajectory, and investment recommendation", compatibleConnectors: ["research", "data"], whyRecommended: "Systematic trend evaluation prevents premature investment in fads" },
      { name: "Customer Research Analyst", purpose: "Understand customer needs, pain points, and unmet expectations", whenToUse: "When exploring customer behavior, preferences, or complaints", requiredInputs: "Customer reviews, survey responses, support tickets, social mentions", outputs: "Customer themes with sentiment, frequency, and evidence counts", compatibleConnectors: ["research", "data", "documents"], whyRecommended: "Transforms scattered customer feedback into structured, actionable insights" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    skills: [
      { name: "Data Analyst", purpose: "Analyze structured data, identify patterns, and generate hypotheses", whenToUse: "When working with spreadsheet data, metrics, or quantitative datasets", requiredInputs: "Structured data (CSV, spreadsheet), column definitions, analysis question", outputs: "Pattern identification with statistical confidence and hypothesized causes", compatibleConnectors: ["data", "documents"], whyRecommended: "Provides systematic approach to data analysis with clear methodology" },
      { name: "Sales Analyst", purpose: "Analyze sales patterns, identify trends, and connect marketing to revenue", whenToUse: "When investigating sales performance, attribution, or revenue patterns", requiredInputs: "Sales data, campaign timing, pricing history, seasonal patterns", outputs: "Sales patterns with correlation notes and investigation priorities", compatibleConnectors: ["data", "documents"], whyRecommended: "Connects marketing efforts to business outcomes with appropriate caveats" },
      { name: "Marketing Performance Analyst", purpose: "Evaluate campaign performance against benchmarks and identify optimizations", whenToUse: "When reviewing campaign results, assessing ROI, or planning optimizations", requiredInputs: "Campaign metrics, benchmarks, target KPIs, historical performance", outputs: "Performance diagnosis with specific optimization recommendations", compatibleConnectors: ["data", "marketing"], whyRecommended: "Systematic performance evaluation with clear next-step recommendations" },
      { name: "Customer Analytics Analyst", purpose: "Analyze customer behavior patterns, segmentation, and journey metrics", whenToUse: "When understanding customer segments, behavior patterns, or journey stages", requiredInputs: "Customer data, behavior metrics, segmentation criteria", outputs: "Customer segments with behavior patterns and engagement insights", compatibleConnectors: ["data", "crm"], whyRecommended: "Data-driven customer understanding for targeted marketing decisions" },
    ],
  },
  {
    id: "strategy",
    label: "Strategy",
    icon: "🎯",
    skills: [
      { name: "Product Strategy Analyst", purpose: "Evaluate product-market fit, identify opportunities, and assess launch readiness", whenToUse: "When planning product launches, evaluating opportunities, or assessing market fit", requiredInputs: "Market research, competitor analysis, customer needs, business constraints", outputs: "Strategic recommendation with evidence, risks, and validation plan", compatibleConnectors: ["documents", "research", "data"], whyRecommended: "Structured approach to product decisions with clear evidence requirements" },
      { name: "Brand Strategy Analyst", purpose: "Evaluate positioning, messaging, and brand differentiation", whenToUse: "When developing positioning, evaluating brand messaging, or planning repositioning", requiredInputs: "Competitor positioning, customer language, brand guidelines, market context", outputs: "Positioning options with evidence, differentiation, and risk assessment", compatibleConnectors: ["research", "documents"], whyRecommended: "Ensures positioning recommendations are grounded in evidence and customer voice" },
      { name: "Marketing Strategist", purpose: "Develop marketing strategy, channel mix, and campaign planning", whenToUse: "When building marketing plans, channel strategies, or campaign briefs", requiredInputs: "Business goals, customer insights, competitive context, budget constraints", outputs: "Marketing strategy with channel recommendations, budget allocation, and timeline", compatibleConnectors: ["documents", "data", "research"], whyRecommended: "Provides structured framework for marketing strategy development" },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: "✍️",
    skills: [
      { name: "Copywriter", purpose: "Generate on-brand copy for any channel and format", whenToUse: "When creating ad copy, email content, website text, or social media posts", requiredInputs: "Brand voice guide, product facts, target audience, channel requirements", outputs: "Platform-ready copy with voice-consistent messaging and CTA", compatibleConnectors: ["documents", "creative"], whyRecommended: "Maintains consistent brand voice across all content creation" },
      { name: "Content Strategist", purpose: "Plan content calendars, repurpose content, and optimize distribution", whenToUse: "When planning content strategy, repurposing existing content, or optimizing content distribution", requiredInputs: "Content performance data, audience insights, brand guidelines, channel specs", outputs: "Content plan with repurposing strategy and distribution recommendations", compatibleConnectors: ["documents", "marketing", "data"], whyRecommended: "Ensures content strategy is data-informed and audience-aligned" },
      { name: "Social Media Strategist", purpose: "Create platform-native social content and engagement strategies", whenToUse: "When building social media campaigns, creating posts, or planning social strategy", requiredInputs: "Brand guidelines, audience insights, platform specs, trending topics", outputs: "Platform-native content with hashtags, visual direction, and engagement hooks", compatibleConnectors: ["documents", "marketing"], whyRecommended: "Platform-aware content creation with engagement optimization" },
      { name: "Campaign Strategist", purpose: "Build campaign briefs, creative concepts, and multi-channel plans", whenToUse: "When planning new campaigns, creating campaign briefs, or developing creative concepts", requiredInputs: "Customer insights, brand positioning, channel mix, budget, timeline", outputs: "Campaign canvas with concept, messaging, channels, and measurement plan", compatibleConnectors: ["documents", "marketing", "data"], whyRecommended: "Structured campaign planning ensures every element connects to the core insight" },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    icon: "👥",
    skills: [
      { name: "Customer Insight Analyst", purpose: "Extract actionable insights from customer feedback and behavior", whenToUse: "When analyzing customer reviews, support tickets, or survey responses", requiredInputs: "Customer feedback data, review exports, support tickets, survey results", outputs: "Customer insights with themes, sentiment, and actionable recommendations", compatibleConnectors: ["data", "documents", "research"], whyRecommended: "Transforms raw customer feedback into prioritized, actionable insights" },
      { name: "Voice-of-Customer Analyst", purpose: "Synthesize customer language, identify patterns, and surface unmet needs", whenToUse: "When understanding customer voice, language patterns, or unmet expectations", requiredInputs: "Customer quotes, review text, social mentions, survey verbatims", outputs: "Voice-of-customer themes with verbatim evidence and priority ranking", compatibleConnectors: ["research", "data"], whyRecommended: "Ensures customer language and needs are captured accurately and systematically" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: "⚙️",
    skills: [
      { name: "Workflow Planner", purpose: "Design repeatable workflows, assign roles, and establish routines", whenToUse: "When building team processes, planning recurring workflows, or establishing routines", requiredInputs: "Team capacity, available tools, skill requirements, timing constraints", outputs: "Workflow plan with assignments, timing, and resource requirements", compatibleConnectors: ["documents", "project", "communication"], whyRecommended: "Transforms ad-hoc analysis into structured, repeatable team processes" },
      { name: "Process Analyst", purpose: "Evaluate existing processes, identify inefficiencies, and recommend improvements", whenToUse: "When reviewing team processes, identifying bottlenecks, or optimizing workflows", requiredInputs: "Current process documentation, team feedback, performance metrics", outputs: "Process analysis with inefficiency identification and improvement recommendations", compatibleConnectors: ["project", "data", "documents"], whyRecommended: "Systematic process improvement with evidence-based recommendations" },
    ],
  },
];

// ─── Helper: get all skills flat ─────────────────────────────────────────────

export function getAllSkills(): SkillDetail[] {
  return SKILL_CATEGORIES.flatMap((cat) =>
    cat.skills.map((s) => ({
      name: s.name,
      category: cat.label,
      purpose: s.purpose,
      whenToUse: s.whenToUse,
      requiredInputs: s.requiredInputs,
      outputs: s.outputs,
      whyRecommended: s.whyRecommended,
    }))
  );
}

// ─── Helper: find skill by name ──────────────────────────────────────────────

export function findSkillByName(name: string): SkillDetail | undefined {
  return getAllSkills().find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}

// ─── Workflow-level skill recommendations ────────────────────────────────────

export const WORKFLOW_SKILL_MAP: Record<string, SkillDetail> = {
  "competitor-campaign-analysis": {
    name: "Competitor Intelligence Analyst",
    category: "Research",
    purpose: "Compare competitor positioning, messaging, features, and identify gaps",
    whenToUse: "When analyzing competitor strategy, positioning, or product offerings",
    requiredInputs: "Competitor pages, public reviews, marketing materials, product specs",
    outputs: "Competitive comparison matrix with positioning map and gap analysis",
    whyRecommended: "This task requires systematic competitor research, evidence evaluation, and structured synthesis — exactly what this skill provides.",
  },
  "customer-complaint-analysis": {
    name: "Customer Insight Analyst",
    category: "Customer",
    purpose: "Extract actionable insights from customer feedback and behavior",
    whenToUse: "When analyzing customer reviews, support tickets, or survey responses",
    requiredInputs: "Customer feedback data, review exports, support tickets, survey results",
    outputs: "Customer insights with themes, sentiment, and actionable recommendations",
    whyRecommended: "Customer complaint analysis requires structured theme detection, sentiment analysis, and evidence-based prioritization.",
  },
  "product-launch-planning": {
    name: "Product Strategy Analyst",
    category: "Strategy",
    purpose: "Evaluate product-market fit, identify opportunities, and assess launch readiness",
    whenToUse: "When planning product launches, evaluating opportunities, or assessing market fit",
    requiredInputs: "Market research, competitor analysis, customer needs, business constraints",
    outputs: "Strategic recommendation with evidence, risks, and validation plan",
    whyRecommended: "Product launch decisions require market validation, competitive assessment, and risk evaluation.",
  },
  "sales-decline-investigation": {
    name: "Sales Analyst",
    category: "Analytics",
    purpose: "Analyze sales patterns, identify trends, and connect marketing to revenue",
    whenToUse: "When investigating sales performance, attribution, or revenue patterns",
    requiredInputs: "Sales data, campaign timing, pricing history, seasonal patterns",
    outputs: "Sales patterns with correlation notes and investigation priorities",
    whyRecommended: "Sales decline investigation requires pattern analysis, trend identification, and hypothesis generation.",
  },
  "campaign-performance-optimization": {
    name: "Marketing Performance Analyst",
    category: "Analytics",
    purpose: "Evaluate campaign performance against benchmarks and identify optimizations",
    whenToUse: "When reviewing campaign results, assessing ROI, or planning optimizations",
    requiredInputs: "Campaign metrics, benchmarks, target KPIs, historical performance",
    outputs: "Performance diagnosis with specific optimization recommendations",
    whyRecommended: "Campaign optimization requires systematic performance evaluation against benchmarks with clear next-step recommendations.",
  },
};
