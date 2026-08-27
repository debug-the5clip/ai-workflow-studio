// ─── Educational content: building blocks, workflow, quizzes, flashcards ─────

export const HERO_EXAMPLES = [
  { text: "Analyze what competitors are doing in the luggage market…", useCaseId: "competitor-analysis" },
  { text: "Understand why customers abandon their carts…", useCaseId: "campaign-analysis" },
  { text: "Plan a launch campaign for our new carry-on…", useCaseId: "campaign-planning" },
  { text: "Turn 160 customer reviews into product decisions…", useCaseId: "customer-research" },
];

export const FLOATING_ELEMENTS = [
  { label: "CUSTOMER", insight: "Understand what people actually want." },
  { label: "COMPETITOR", insight: "Discover what competitors are doing." },
  { label: "MARKET", insight: "See where demand is heading next." },
  { label: "PRODUCT", insight: "Decide what to build — and why." },
  { label: "CAMPAIGN", insight: "Turn insights into campaigns." },
  { label: "SALES", insight: "Connect marketing to real revenue." },
  { label: "CONTENT", insight: "Publish with purpose, not habit." },
  { label: "ANALYTICS", insight: "Learn what worked and what to improve." },
];

export interface WorkflowNode {
  id: string;
  label: string;
  question: string;
  explanation: string;
  claudeFlow: { input: string; analysis: string; insight: string };
}

export const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: "market",
    label: "MARKET SIGNALS",
    question: "Where is the market moving?",
    explanation: "Industry reports, airline policy changes, travel-behavior shifts. Signals arrive raw and noisy — Claude helps extract, date-stamp and rank them by evidence strength so you react to trends, not headlines.",
    claudeFlow: { input: "Collected articles & reports you upload or paste", analysis: "Extract signals → rate evidence → separate fads from structural shifts", insight: "A ranked watchlist of market movements that matter for your category" },
  },
  {
    id: "customer",
    label: "CUSTOMER SIGNALS",
    question: "What are customers repeatedly asking for?",
    explanation: "Reviews, support tickets, survey answers. Hundreds of scattered voices become clustered themes with share-of-mention counts — praise, pains, and unmet needs separated cleanly.",
    claudeFlow: { input: "Review exports & anonymized tickets (documents/spreadsheets)", analysis: "Cluster themes → count mentions → attach sentiment + verbatim evidence", insight: "Ranked pain points and underlying needs, each traceable to real quotes" },
  },
  {
    id: "competitor",
    label: "COMPETITOR SIGNALS",
    question: "What are competitors doing about it?",
    explanation: "Public pages, published features, visible messaging. Claude compares positioning and flags open territory — while clearly separating what competitors said from what you interpret.",
    claudeFlow: { input: "Saved competitor pages & public info you're permitted to use", analysis: "Categorize → compare across dimensions → identify gaps → quality-check claims", insight: "Positioning map, feature matrix, and honest gaps marked UNKNOWN where data is missing" },
  },
  {
    id: "insight",
    label: "INSIGHT",
    question: "So what? What does it all mean together?",
    explanation: "The synthesis step. Market + customer + competitor streams converge into one decision-relevant statement — like \"frequent flyers fear the gate moment more than the flight.\" Insights state what changed and why it matters.",
    claudeFlow: { input: "All prior analyses as documents", analysis: "Dedupe → prioritize by decision-relevance → synthesize across streams", insight: "One-page briefing: top movements, decisions needed, watch items" },
  },
  {
    id: "decision",
    label: "DECISION",
    question: "What will we do about it?",
    explanation: "Claude supports this step — it never replaces it. Options get framed with trade-offs and labeled assumptions; humans choose. Good AI-assisted decisions document which evidence drove them.",
    claudeFlow: { input: "The insight brief + your constraints (budget, timing, capacity)", analysis: "Frame options → surface trade-offs → list assumptions explicitly", insight: "A shortlist of viable moves ready for human judgment" },
  },
  {
    id: "content",
    label: "CONTENT",
    question: "How do we express the decision?",
    explanation: "The chosen angle becomes assets: posts, articles, videos, page copy. One insight adapts to each platform's native grammar instead of being copy-pasted everywhere identically.",
    claudeFlow: { input: "The decision + brand voice guide", analysis: "Adapt message per platform → draft variants → annotate persuasion mechanics", insight: "Platform-native drafts, each anchored to the same core insight" },
  },
  {
    id: "campaign",
    label: "CAMPAIGN",
    question: "How do we amplify it?",
    explanation: "Paid reach joins organic content. Concept, headlines, ad copy, targeting logic and budget split are drafted as a coherent set — designed to be tested, not assumed.",
    claudeFlow: { input: "Campaign brief: objective, audience, insight, channels", analysis: "Generate concept → derive channel assets → propose test structure", insight: "A complete campaign canvas with built-in experiments" },
  },
  {
    id: "measure",
    label: "MEASURE",
    question: "What actually happened?",
    explanation: "Funnel math over vibes: stage-through rates by ad and channel, compared against pre-set targets. Claude localizes leaks and generates hypotheses — never verdicts.",
    claudeFlow: { input: "Performance exports from your ad & analytics platforms", analysis: "Compute funnel stages → isolate weakest link → generate cited hypotheses", insight: "\"What worked / didn't / possible reasons / test next\" — hypotheses, not conclusions" },
  },
  {
    id: "optimize",
    label: "OPTIMIZE ↺",
    question: "What does next time do differently?",
    explanation: "Results crystallize into transferable insights; insights spawn the next experiment; experiments improve the next campaign. This is where a one-off win becomes compounding advantage.",
    claudeFlow: { input: "Analysis output + experiment results", analysis: "Crystallize principle → design adjacent experiment → spec improved flight", insight: "The loop closes: result → insight → experiment → better campaign ↺" },
  },
];

// ─── Five building blocks ─────────────────────────────────────────────────────

export const PROMPT_COMPONENTS = [
  { key: "CONTEXT", label: "Context", text: "Who you are, what business you're in, what situation Claude is walking into.", contribution: "Without context, Claude writes generic marketing-speak. With it, outputs sound like they came from your team." },
  { key: "OBJECTIVE", label: "Objective", text: "The single outcome this prompt must achieve.", contribution: "One objective forces focus. Multiple objectives in one prompt produce mushy, hedged output." },
  { key: "INPUT", label: "Input", text: "Exactly what material Claude receives and its structure.", contribution: "Describing your data's shape lets Claude navigate it correctly instead of guessing." },
  { key: "TASK", label: "Task", text: "Numbered steps describing the method to follow.", contribution: "Steps make the work repeatable. Same steps + same skill = consistent weekly output." },
  { key: "CONSTRAINTS", label: "Constraints", text: "Rules: cite sources, mark UNKNOWN, don't invent, quote exactly.", contribution: "This is your hallucination firewall. Constraints turn plausible fiction into disciplined analysis." },
  { key: "OUTPUT", label: "Output", text: "The required format: sections, tables, length limits.", contribution: "Specified formats make outputs comparable week over week and drop-in ready for your docs." },
  { key: "QUALITY CHECK", label: "Quality check", text: "Ask Claude to flag low-evidence claims, gaps and uncertainty.", contribution: "Built-in self-audit surfaces weak spots before you build on shaky ground." },
];

export const WEAK_PROMPT = "Analyze competitors.";
export const STRONG_PROMPT = `Analyze publicly available information about selected luggage competitors.
Compare their positioning, key features, customer-facing messaging and promotional themes.
Group findings into clear themes, provide sources for important observations,
distinguish evidence from interpretation, identify potential gaps for further
investigation, and do not invent information.`;

export const SKILL_STAGES = [
  { stage: "INPUT", detail: "Define exactly what raw material enters: which documents, which fields, what quality bar." },
  { stage: "COLLECT", detail: "Gather the inputs into one place — exports, saved pages, pasted excerpts you're authorized to use." },
  { stage: "CATEGORIZE", detail: "Sort material into meaningful buckets before analyzing. Structure first, conclusions second." },
  { stage: "COMPARE", detail: "Put items side-by-side on shared dimensions. Normalized units, aligned categories." },
  { stage: "IDENTIFY GAPS", detail: "Look for what's missing: unknowns, blind spots, unanswered questions. Mark them honestly." },
  { stage: "GENERATE INSIGHT", detail: "Synthesize comparisons into decision-relevant statements. Separate evidence from interpretation." },
  { stage: "QUALITY CHECK", detail: "Audit the draft: every claim sourced? Uncertainty flagged? Would this survive a skeptical colleague?" },
  { stage: "OUTPUT", detail: "Deliver in the agreed format — table, matrix, brief — ready to drop into your workflow." },
];

export const CONNECTORS = [
  { name: "Documents", type: "connector" as const, note: "Upload briefs, research PDFs and notes directly. Claude reads what you give it.", icon: "file" },
  { name: "Spreadsheets", type: "connector" as const, note: "Exports of reviews, sales, spend — structured rows become analyzable patterns.", icon: "sheet" },
  { name: "Campaign Reports", type: "example" as const, note: "Example business source: ad-platform exports you download and share with Claude.", icon: "chart" },
  { name: "Product Information", type: "example" as const, note: "Example business source: spec sheets and catalogs from your own systems.", icon: "box" },
  { name: "Team Information", type: "example" as const, note: "Example business source: meeting notes and planning docs shared by your team.", icon: "users" },
  { name: "Web / Public Sources", type: "example" as const, note: "Public pages and articles you collect and paste in. You control what's used.", icon: "globe" },
];

export const LOOP_STAGES = [
  { stage: "RESEARCH", example: "Launch campaign goes live. Data starts flowing within hours." },
  { stage: "INSIGHT", example: "Week-one read: curiosity-hook ad drives clicks but not carts — leak is at checkout, not creative." },
  { stage: "ACTION", example: "Ship the early-shipping-display variant and rebalance budget toward proven hooks." },
  { stage: "MEASURE", example: "Two-week test window. Completion rate up 19%; guardrails clean." },
  { stage: "LEARN", example: "Transferable principle: buyers reward price honesty early. Seed it into the next campaign." },
];

export const ROUTINE_WEEK = [
  { day: "MONDAY", focus: "Customer intelligence", detail: "Fresh reviews & tickets → theme deltas → route top pain to product.", blocks: ["Prompt", "Skill", "Connector"] },
  { day: "TUESDAY", focus: "Competitor intelligence", detail: "Rotate one competitor deep-dive; keep the landscape perpetually current.", blocks: ["Prompt", "Skill", "Connector"] },
  { day: "WEDNESDAY", focus: "Content planning", detail: "Best insight of the week becomes next week's platform-native batch.", blocks: ["Skill", "Loop"] },
  { day: "THURSDAY", focus: "Campaign review", detail: "Live campaigns vs targets; hypotheses logged; tests approved by humans.", blocks: ["Prompt", "Skill"] },
  { day: "FRIDAY", focus: "Performance analysis", detail: "Full funnel diagnosis → experiments queued → Monday's brief pre-seeded.", blocks: ["Skill", "Loop"] },
];

// ─── Learning system ──────────────────────────────────────────────────────────

export interface Quiz {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZZES: Quiz[] = [
  {
    id: "q-routine",
    topic: "Routine",
    question: "You want Claude to follow the same competitor-analysis process every week. What is most useful?",
    options: ["Prompt", "Skill", "Connector", "Routine"],
    correctIndex: 3,
    explanation: "A Routine is the scheduled cadence that reuses everything else. The Skill holds the method, but the Routine is what makes it happen reliably every Tuesday without relying on memory or motivation.",
  },
  {
    id: "q-prompt",
    topic: "Prompt",
    question: "Your competitor prompt keeps producing invented statistics. What's the best fix?",
    options: ["Ask politely for accuracy", "Add constraints: cite sources, mark unknowns, never invent numbers", "Make the prompt longer overall", "Switch tasks entirely"],
    correctIndex: 1,
    explanation: "Explicit constraints are the hallucination firewall: 'provide sources', 'mark missing values UNKNOWN', 'do not invent information'. Politeness doesn't constrain; rules do.",
  },
  {
    id: "q-skill",
    topic: "Skill",
    question: "What distinguishes a Skill from a Prompt?",
    options: ["Skills cost more tokens", "A prompt is one instruction; a Skill is a reusable method for a type of work", "Skills require coding", "They're identical"],
    correctIndex: 1,
    explanation: "A prompt asks once. A Skill encodes the whole method — stages, quality checks, output format — so the same type of work gets done consistently, by anyone on the team, any time.",
  },
  {
    id: "q-connector",
    topic: "Connector",
    question: "You want Claude to analyze last quarter's sales. Where should the data come from?",
    options: ["Claude's memory of your company", "An authorized export uploaded through your connector/document flow", "A public website guess", "Claude can't access any data"],
    correctIndex: 1,
    explanation: "Connectors define WHERE information comes from — authorized internal exports you control. Claude has no memory of your private data and shouldn't guess; you supply verified sources.",
  },
  {
    id: "q-loop",
    topic: "Loop",
    question: "Your campaign won this month. What makes the win compound?",
    options: ["Celebrate and move on", "Extract the transferable principle and feed it into the next cycle's design", "Spend more on the same ads forever", "Delete the old campaign data"],
    correctIndex: 1,
    explanation: "Loops convert results into principles ('buyers reward price honesty early') and principles into next-cycle designs. A win without extraction is just luck you can't repeat.",
  },
  {
    id: "q-model",
    topic: "Model selection",
    question: "For a quick subject-line brainstorm versus a 200-review analysis, what's true?",
    options: ["Use the most powerful model for both", "Match effort to task: light creative work vs heavy multi-document analysis have different needs", "Model choice never matters", "Always use the fastest model"],
    correctIndex: 1,
    explanation: "Task complexity varies. Long-context, multi-document analysis benefits from stronger reasoning models; rapid ideation favors speed. Match the tool to the job rather than defaulting to either extreme.",
  },
  {
    id: "q-data",
    topic: "Data selection",
    question: "Before asking Claude to analyze reviews, what should you check FIRST?",
    options: ["That the analysis sounds impressive", "That the data is representative, authorized, and complete enough for the question", "That the file opens fast", "Nothing — just paste and go"],
    correctIndex: 1,
    explanation: "Garbage in, confident garbage out. Representative sampling, permission to use the data, and sufficiency for the question matter more than anything Claude does downstream.",
  },
  {
    id: "q-human",
    topic: "Human review",
    question: "Claude drafted a full campaign including comparative claims about competitors. Before launch you should:",
    options: ["Ship it — AI is accurate", "Have humans verify claims, check legal/comparative risk, and approve publication", "Let another AI approve it", "Only check spelling"],
    correctIndex: 1,
    explanation: "AI drafts; humans approve. Comparative claims carry legal exposure, and only your team knows context Claude lacks. Verification before publication is non-negotiable.",
  },
];

export const FLASHCARDS = [
  { term: "PROMPT", character: "speech-bubble", definition: "One instruction asking Claude to do one piece of work.", example: "\"Summarize these 40 reviews into top complaints.\"", whyItMatters: "A good prompt is the fastest way to get a usable answer for a one-off question. Don't over-build — use a Prompt when you won't ask the same question again." },
  { term: "SKILL", character: "toolbox", definition: "A reusable method for performing a type of work consistently.", example: "Competitor Intelligence Skill: collect → categorize → compare → gaps → insight.", whyItMatters: "A Skill is only worth building when you'll ask the same kind of question repeatedly, or when the method matters as much as the answer." },
  { term: "CONNECTOR", character: "bridge", definition: "Where information comes FROM — authorized sources linked into your workflow.", example: "Uploaded review spreadsheets, saved competitor pages, internal reports.", whyItMatters: 'A Connector turns "Claude thinks" into "Claude knows" because it works with your real, permissioned data.' },
  { term: "LOOP", character: "circular-arrow", definition: "A repeating cycle that turns results into improving next cycles.", example: "Research → Insight → Action → Measure → Learn → repeat.", whyItMatters: "A Loop is what makes an analysis get sharper over time instead of staying static. Without a loop, insights are one-offs." },
  { term: "ROUTINE", character: "calendar", definition: "A scheduled rhythm that runs loops and skills without relying on memory.", example: "Monday customer intel, Tuesday competitor intel, Friday performance.", whyItMatters: 'A Routine turns "something we should really do" into "something that happens automatically, on time, every time."' },
];

// ─── Trust section ────────────────────────────────────────────────────────────

export const CLAUDE_HELPS_WITH = [
  { title: "Research", detail: "Gather and structure information from sources you authorize." },
  { title: "Organize", detail: "Cluster hundreds of messy inputs into themes you can act on." },
  { title: "Analyze", detail: "Compute funnels, compare cohorts, localize leaks — transparently." },
  { title: "Draft", detail: "Produce first versions of copy, briefs and plans in minutes." },
  { title: "Recommend", detail: "Frame options with trade-offs and labeled assumptions." },
  { title: "Automate", detail: "Run repeatable workflows on schedule via skills and routines." },
];

export const HUMANS_SHOULD = [
  { title: "Verify important information", detail: "Spot-check facts, quotes and figures before they inform decisions." },
  { title: "Approve campaigns", detail: "Brand voice, legal exposure and cultural fit need human sign-off." },
  { title: "Make strategic decisions", detail: "Direction-setting weighs context no model fully sees." },
  { title: "Validate assumptions", detail: "Every labeled assumption deserves a human reality check." },
  { title: "Review sensitive information", detail: "Privacy, confidentiality and permissions stay human-governed." },
  { title: "Approve external publication", detail: "Nothing ships without a person pressing go." },
  { title: "Own financial & product calls", detail: "Budgets, pricing and roadmaps are human decisions — AI informs, people decide." },
];
