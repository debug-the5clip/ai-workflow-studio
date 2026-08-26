import type { UseCase } from "@/lib/lab-types";

/**
 * The use-case engine data. Every card in the "What do you want to accomplish?"
 * grid is driven by one of these records. Adding a new use case = adding a
 * record here; no component changes required.
 *
 * All scenarios use a fictional premium-travel brand, VOYARA LUGGAGE.
 * All numbers and findings are SAMPLE / DEMONSTRATION DATA.
 */

export const COMPANY_CONTEXT =
  "Voyara is a fictional direct-to-consumer luggage company. Its hero product is the Voyager Pro carry-on (polycarbonate shell, USB-C passthrough, modular packing cubes). Voyara sells online, ships from two regional warehouses, and runs always-on paid social plus seasonal campaigns.";

export const USE_CASES: UseCase[] = [
  // ─── RESEARCH ──────────────────────────────────────────────────────────────
  {
    id: "customer-research",
    emoji: "🔎",
    title: "Customer Research",
    category: "Research",
    summary: "Understand what travelers actually want before you build, price, or promote anything.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which traveler needs our current product line underserves, and what the next product or feature should solve." },
      { title: "Information", question: "What information do we need?", answer: "Product reviews of our own line, support-ticket themes, survey responses from a post-purchase email, and public forum discussions about travel pain points." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Exported review CSVs and anonymized support tickets uploaded as documents. Public forums via copy-paste excerpts you have rights to use." },
      { title: "Skill", question: "What method should Claude follow?", answer: "A Customer Research Skill: collect → detect recurring themes → separate pains from needs → rank by frequency and severity → propose opportunities → flag low-evidence claims." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "A structured prompt with context, objective, input description, task, constraints and required output format — see the full prompt below." },
      { title: "Run", question: "Analyze", answer: "Claude processes the reviews and tickets, clusters them into themes, and separates evidence from interpretation." },
      { title: "Output", question: "What did Claude find?", answer: "Theme clusters with share-of-mentions, sentiment, representative quotes, ranked pain points, unmet needs, and opportunity candidates.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Check that quotes are real, confirm theme counts against the raw data sample, and validate that 'needs' aren't just one loud customer's wish." },
      { title: "Action", question: "What can we do next?", answer: "Feed top needs into Product Opportunity analysis, or turn pains into campaign messaging angles." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Re-run monthly on new reviews and tickets. Track whether each theme grows or shrinks over time." },
    ],
    prompt: `You are a customer-insights analyst for Voyara Luggage, a fictional DTC luggage brand.

CONTEXT
I will paste 120 customer reviews and 40 anonymized support tickets for our Voyager Pro carry-on.

OBJECTIVE
Identify what customers consistently praise, complain about, and ask for, so we can decide what to improve or launch next.

INPUT
- Reviews: star rating, date, country, free text.
- Tickets: category tag, resolution time, free text.

TASK
1. Cluster feedback into 6–10 recurring themes.
2. For each theme: share of mentions, dominant sentiment, and one verbatim quote as evidence.
3. Separate explicit pain points from underlying customer needs.
4. Propose up to 5 product or messaging opportunities, ranked by evidence strength.

CONSTRAINTS
- Use only information in the provided text. Do not invent statistics.
- Mark any claim supported by fewer than 5 mentions as "low evidence".
- Quote customers exactly when quoting.

OUTPUT FORMAT
Markdown with sections: Theme Overview table, Pain Points, Underlying Needs, Opportunities (ranked), Evidence Gaps.`,
    output: {
      kind: "themes",
      headline: "What 160 customer conversations say about the Voyager Pro",
      themes: [
        { theme: "Organization & packing cubes", share: 24, sentiment: "positive", quote: "\"The modular cubes changed how I pack for a week-long trip.\"" },
        { theme: "Battery / charging expectations", share: 18, sentiment: "negative", quote: "\"Passthrough is great but I still carry a separate power bank.\"" },
        { theme: "Weight when fully packed", share: 15, sentiment: "negative", quote: "\"Hits 7.8 kg packed — over budget airline limits.\"" },
        { theme: "Durability & shell scratches", share: 14, sentiment: "mixed", quote: "\"Survived six flights; shell shows white scuffs though.\"" },
        { theme: "Wheel noise on cobblestone", share: 11, sentiment: "negative", quote: "\"Sounds like a shopping cart through old town streets.\"" },
        { theme: "Design compliments", share: 10, sentiment: "positive", quote: "\"Three strangers at the gate asked about it.\"" },
        { theme: "Warranty & service experience", share: 8, sentiment: "mixed", quote: "\"Replacement latch arrived fast, but I had to chase status twice.\"" },
      ],
      pains: [
        "Packed weight exceeds low-cost carrier limits",
        "No built-in battery — only a passthrough port",
        "Shell scuffs visibly within first months",
        "Louder wheels than premium competitors",
        "Warranty status updates require chasing",
      ],
      needs: [
        "Confidence they'll pass carry-on checks anywhere",
        "One less device to carry (integrated charging)",
        "Luggage that looks good after year two, not week two",
        "Quiet, effortless movement through cities",
        "Service that communicates proactively",
      ],
    },
    reviewChecklist: [
      "Spot-check 5 quotes against the original reviews",
      "Confirm the 'weight' theme appears across countries, not just one market",
      "Ask: would we change a product decision based on this? If unsure, gather more data",
    ],
    actions: [
      { label: "Turn top need into a Product Opportunity scorecard", description: "Run integrated-charging demand through the opportunity evaluation flow." },
      { label: "Convert pains into ad messaging", description: "Use 'passes every carry-on check' as a campaign angle backed by real complaints competitors ignore." },
    ],
    loopTip: "Schedule this as a monthly Routine step: same skill, fresh data, trend lines per theme.",
  },

  {
    id: "review-analysis",
    emoji: "⭐",
    title: "Customer Review Analysis",
    category: "Research",
    summary: "Turn hundreds of scattered reviews into a ranked list of fixes and selling points.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Whether recent product-page changes improved sentiment, and which complaint categories are rising." },
      { title: "Information", question: "What information do we need?", answer: "This quarter's reviews vs last quarter's, with ratings, dates and text." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Spreadsheet exports from your review platform — pasted tables or uploaded files." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Review Analysis Skill: normalize ratings → cluster text → compare periods → flag emerging negatives → summarize wins worth amplifying." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Structured comparison prompt with both periods clearly labeled." },
      { title: "Run", question: "Analyze", answer: "Claude produces a period-over-period sentiment comparison." },
      { title: "Output", question: "What did Claude find?", answer: "Rising complaint categories, shrinking praises, net sentiment movement, and quotes to feature on product pages.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Confirm period boundaries were applied correctly and check any 'emerging' claim against raw counts." },
      { title: "Action", question: "What can we do next?", answer: "Route rising complaints to product team; feature shrinking complaints as proof-points in ads." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Add to the Friday Performance Analysis routine slot with a fixed comparison template." },
    ],
    prompt: `Compare customer sentiment for the Voyager Pro between Q1 and Q2.

CONTEXT
Two CSV blocks follow: REVIEWS_Q1 (Jan–Mar) and REVIEWS_Q2 (Apr–Jun), each with rating, date, text.

OBJECTIVE
Tell us if the April shell-coating update reduced scuff complaints, and surface any new issues.

TASK
1. Compute average rating per month and note the trend.
2. Cluster review text into themes; report mention counts per quarter.
3. Explicitly compare: which themes grew, shrank, or appeared newly?
4. Extract 5 positive quotes suitable for product-page social proof.

CONSTRAINTS
- Report counts, not impressions ("12 mentions in Q2 vs 27 in Q1").
- If the coating update's effect is unclear, say so plainly.
- No invented numbers.

OUTPUT FORMAT
Sections: Rating Trend, Theme Movement Table, New Issues, Featured Quotes, Verdict.`,
    output: {
      kind: "themes",
      headline: "Q1 → Q2 sentiment shift · SAMPLE DEMO DATA",
      themes: [
        { theme: "Scuff complaints after coating update", share: 9, sentiment: "mixed", quote: "\"Fewer deep scratches, but scuffs still show in bright light.\"" },
        { theme: "Packing organization praise", share: 26, sentiment: "positive", quote: "\"Best-organized carry-on I've owned.\"" },
        { theme: "Weight concerns", share: 17, sentiment: "negative", quote: "\"Still nervous at budget-airline check-in.\"" },
        { theme: "New: zipper snag reports", share: 7, sentiment: "negative", quote: "\"Main zipper catches near the expansion fold.\"" },
      ],
      pains: ["Zipper snag reports are NEW in Q2 (7 mentions)", "Weight remains the #1 unresolved complaint"],
      needs: ["Reassurance at check-in", "Hardware that feels premium at year one"],
    },
    reviewChecklist: [
      "Verify Q2 date filters excluded late-March reviews",
      "Confirm the zipper issue with the product team before acting",
    ],
    actions: [
      { label: "Escalate zipper finding to product", description: "Seven consistent reports deserve an engineering look." },
      { label: "Feature organization praise in ads", description: "Highest-share positive theme is ready-made messaging." },
    ],
    loopTip: "Pin this comparison template so every quarter's run is identical.",
  },

  {
    id: "competitor-analysis",
    emoji: "🕵️",
    title: "Competitor Analysis",
    category: "Research",
    summary: "Map the competitive landscape: positioning, features, messaging and gaps. Flagship workflow.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "How competing luggage brands position themselves, what they emphasize, and where the open space is for Voyara." },
      { title: "Information", question: "What information do we need?", answer: "Publicly available information: competitor websites, published feature lists, public pricing pages, publicly visible review themes, and their public ad messaging." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Documents you upload (saved pages, exported spreadsheets) plus web/public sources you paste in. Only use information you're permitted to use." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Competitor Intelligence Skill: collect → categorize → compare → identify gaps → generate insight → quality check → output." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "The flagship structured prompt — context, scope, comparison dimensions, evidence rules, anti-hallucination constraints." },
      { title: "Run", question: "Analyze", answer: "Claude compares all four competitors across positioning, features and messaging, then flags gaps." },
      { title: "Output", question: "What did Claude find?", answer: "Positioning map, feature comparison matrix, customer/message/promotional themes, strengths, potential gaps, opportunities and questions to investigate.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Confirm each competitor fact against its live page; pricing changes often; discard anything Claude couldn't source." },
      { title: "Action", question: "What can we do next?", answer: "Turn a gap into a Product Opportunity, a Campaign, an Ad, Content, or a Report — the workflow continues below the dashboard." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Tuesday Competitor Intelligence routine: refresh quarterly per competitor, watch for repositioning moves." },
    ],
    prompt: `Analyze publicly available information about selected luggage competitors for Voyara Luggage (a fictional brand).

CONTEXT
We sell the Voyager Pro carry-on (~$295, polycarbonate, modular cubes, USB-C passthrough). Attached: saved homepage text, feature pages and public pricing for four competitors (fictionalized): AeroCase, NomadOne, TrailKit, Skyline Co.

OBJECTIVE
Understand each competitor's positioning, key features, customer-facing messaging and promotional themes so we can find defensible open space.

TASK
1. Summarize each competitor: positioning statement, price tier, signature feature, primary message.
2. Build a feature comparison matrix across: weight, durability warranty, organization system, charging, price.
3. Group findings into clear themes: customer themes (from their visible review excerpts), message themes, promotional themes.
4. Identify potential gaps — segments or promises no competitor owns.
5. Provide sources for important observations (which document/page).
6. Distinguish evidence from interpretation. Label interpretations clearly.
7. Identify questions for further investigation.
8. Do not invent information. If something isn't in the provided documents, mark it UNKNOWN.

OUTPUT FORMAT
Markdown: Per-Competitor Summary, Feature Matrix (table), Themes (3 groups), Strengths Map, Potential Gaps, Opportunities, Questions to Investigate.`,
    output: {
      kind: "competitorDashboard",
      competitors: [
        { name: "AeroCase", positioning: "Ultra-lightweight specialist", priceTier: "Premium", signatureFeature: "Lightest shell in class (claimed)", messaging: "\"Fly lighter. Pack everything.\"", },
        { name: "NomadOne", positioning: "Budget adventure brand", priceTier: "Budget", signatureFeature: "Aggressive lifetime replacement plan", messaging: "\"Built for abuse. Priced for everyone.\"" },
        { name: "TrailKit", positioning: "Modular gear ecosystem", priceTier: "Mid", signatureFeature: "Attachable daypack accessory line", messaging: "\"One bag. Every journey.\"" },
        { name: "Skyline Co", positioning: "Business-travel heritage", priceTier: "Premium", signatureFeature: "Garment-integrated business compartment", messaging: "\"Arrive sharp since 1987.\"" },
      ],
      strengths: [
        "Only player combining modular cubes + charging passthrough",
        "Direct-to-consumer pricing undercuts premium rivals",
        "Design-led identity resonates with younger travelers",
      ],
      gaps: [
        "Nobody credibly owns 'airline-compliant weight' — our biggest customer complaint is also theirs (interpretation)",
        "No competitor publishes third-party durability test results",
        "Quiet-wheel engineering is unclaimed messaging territory",
        "Post-purchase proactive communication absent across the set",
      ],
      opportunities: [
        "Own 'check-in confidence' with verified weight data",
        "Publish independent durability testing as trust content",
        "Launch a silent-wheel R&D story to differentiate hardware",
      ],
      investigate: [
        "UNKNOWN: AeroCase's actual return rate — request or estimate via public data only",
        "Do budget carriers update size limits soon? Monitor airline policy pages",
        "What does TrailKit's accessory attach-rate look like publicly?",
      ],
    },
    reviewChecklist: [
      "Open each competitor's current site — has anything changed since your snapshot?",
      "Separate the facts (they said X) from interpretations (gap Y exists)",
      "Never rely on Claude's memory alone for pricing or features",
    ],
    actions: [
      { label: "Product Opportunity", description: "'Check-in confidence' becomes a scored opportunity card." },
      { label: "Campaign", description: "Brief a campaign around airline-compliance confidence." },
      { label: "Ad", description: "Draft the single strongest angle as a paid ad set." },
      { label: "Content", description: "Commission the durability-test content series." },
      { label: "Report", description: "Assemble everything into an executive-ready brief." },
    ],
    loopTip: "Refresh one competitor per week on rotation — by week four the whole landscape is current.",
  },

  {
    id: "competitor-comparison",
    emoji: "📊",
    title: "Competitor Product Comparison",
    category: "Research",
    summary: "Side-by-side spec battle cards your sales and ads teams can actually use.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Where exactly the Voyager Pro wins and loses on specs against its two closest rivals." },
      { title: "Information", question: "What information do we need?", answer: "Published spec sheets and pricing pages for Voyager Pro, AeroCase and TrailKit." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Saved product pages uploaded as documents; spec spreadsheet maintained by the team." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Comparison Skill: align spec dimensions → normalize units → mark unknowns → derive honest win/loss/tie verdicts." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Spec-by-spec comparison prompt with strict UNKNOWN rules." },
      { title: "Run", question: "Analyze", answer: "Claude builds the normalized matrix and verdict column." },
      { title: "Output", question: "What did Claude find?", answer: "Feature matrix with win/loss/tie per row and honest trade-off notes.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Every number against the live spec sheet — weight claims especially." },
      { title: "Action", question: "What can we do next?", answer: "Hand the win rows to sales enablement; fix or de-emphasize loss rows." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Re-run whenever a competitor ships a new model." },
    ],
    prompt: `Build an honest product comparison between the Voyager Pro and its two closest competitors using ONLY attached spec sheets.

OBJECTIVE
Give sales and advertising teams a defensible battle card.

TASK
1. Align all products on shared dimensions: weight, capacity, shell material, wheels, warranty, price.
2. Normalize units (kg/lb, liters).
3. Mark every missing value UNKNOWN — never estimate silently.
4. Verdict per dimension: WIN / LOSS / TIE from Voyara's perspective, with one-line justification.
5. End with: three talking points we can prove, and two objections we must handle carefully.

CONSTRAINTS
Cite the source document for each row. No invented specs.

OUTPUT FORMAT
Comparison table, then Talking Points, then Objection Handling.`,
    output: {
      kind: "insights",
      headline: "Battle card: Voyager Pro vs AeroCase vs TrailKit · SAMPLE DATA",
      cards: [
        { title: "Proven wins", body: "Organization system (only true modular cubes) · Price vs premium tier ($295 vs $340+) · Charging passthrough unique in set", tone: "positive" },
        { title: "Honest losses", body: "Empty weight 0.4 kg heavier than AeroCase · No attachable daypack like TrailKit's ecosystem", tone: "risk" },
        { title: "Talking point 1", body: "\"The only carry-on in this class with a genuinely modular interior AND charge-through design.\"", tone: "neutral" },
        { title: "Objection to handle", body: "\"AeroCase is lighter\" — respond with packed-weight reality: our cubes distribute load better; total compliance depends on packing, not empty weight.", tone: "neutral" },
      ],
    },
    reviewChecklist: ["Re-verify weight figures against current official pages", "Legal-check comparative claims before publishing"],
    actions: [{ label: "Send battle card to sales", description: "Wins and objection scripts ready for enablement." }, { label: "Fix a loss row", description: "Brief product on the empty-weight gap." }],
    loopTip: "Set a calendar trigger: re-run whenever any rival announces a new SKU.",
  },

  {
    id: "competitor-campaigns",
    emoji: "📣",
    title: "Competitor Campaign Analysis",
    category: "Research",
    summary: "Decode what competitors' public campaigns are really doing — and where to zig.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "What themes competitors push in season, so our next campaign doesn't blend in." },
      { title: "Information", question: "What information do we need?", answer: "Publicly visible ads, social posts and promo emails competitors ran this season (screenshots/excerpts you collected)." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Ad libraries and public posts you manually collect and upload. Example sources — not automatic connections." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Campaign Decode Skill: inventory → extract promise/audience/channel per ad → cluster themes → find saturation → recommend contrast angles." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Inventory-and-theme extraction prompt." },
      { title: "Run", question: "Analyze", answer: "Claude maps the competitive messaging landscape for the season." },
      { title: "Output", question: "What did Claude find?", answer: "Theme saturation chart and unsaturated contrast angles.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Ad-library data is partial — treat shares as directional, never exact." },
      { title: "Action", question: "What can we do next?", answer: "Pick a contrast angle and feed Campaign Planning." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Run at the start of each planning cycle; archive snapshots to see drift." },
    ],
    prompt: `Here are 30 competitor ads and posts I collected from public sources (attached).

TASK
1. Inventory: brand, channel, core promise, target audience, offer type.
2. Cluster into promotional themes; count ads per theme.
3. Identify saturated themes (>25% of volume).
4. Suggest 4 contrast angles for Voyara that avoid saturated space, each grounded in a gap you observed.
Do not speculate about competitors' results — we only see their creative, not performance.

OUTPUT: Inventory table, Theme Saturation, Contrast Angles.`,
    output: {
      kind: "insights",
      headline: "Seasonal message saturation · SAMPLE DATA",
      cards: [
        { title: "Saturated: \"Adventure awaits\"", body: "38% of collected volume. Mountain vistas, wanderlust copy. Avoid.", tone: "risk" },
        { title: "Saturated: Sitewide discounting", body: "27% ran % off promos. Racing to the bottom.", tone: "risk" },
        { title: "Underserved: Practical confidence", body: "Only 2 of 30 ads address packing stress or airline rules. Open space.", tone: "positive" },
        { title: "Contrast angle", body: "Own the pre-flight moment: 'The night before' — calm preparation vs everyone else's fantasy departures.", tone: "positive" },
      ],
    },
    reviewChecklist: ["Your collection window may miss channels — note blind spots", "Saturation ≠ ineffectiveness; a common theme can still work"],
    actions: [{ label: "Take the angle to Campaign Planning", description: "The 'night before' concept enters the campaign canvas." }],
    loopTip: "Snapshot competitor creative at the start of every quarter for drift tracking.",
  },

  {
    id: "market-trends",
    emoji: "📈",
    title: "Market Trend Research",
    category: "Research",
    summary: "Spot the travel-market shifts worth responding to before they're obvious.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which travel behavior shifts could reshape demand for carry-ons in the next 12 months." },
      { title: "Information", question: "What information do we need?", answer: "Industry articles, airline policy news, search-trend exports, and conference/recap notes the team collects." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Uploaded industry PDFs and pasted article excerpts. Web/public sources you supply." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Trend Synthesis Skill: extract signals → rate evidence strength → separate fad vs structural shift → map implications for us." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Signal-extraction prompt demanding citations per signal." },
      { title: "Run", question: "Analyze", answer: "Claude ranks signals by evidence and relevance to luggage." },
      { title: "Output", question: "What did Claude find?", answer: "Ranked signal board with implications and recommended responses.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Trend pieces overstate; check publication dates and whether multiple independent sources agree." },
      { title: "Action", question: "What can we do next?", answer: "Promote strong signals to Product Opportunity or adjust positioning." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Monthly Monday scan with the same template; diff against last month's board." },
    ],
    prompt: `From the attached industry articles and notes, extract travel-behavior signals relevant to a carry-on luggage brand.

TASK
1. List each distinct signal with: one-line description, source citation, evidence strength (strong/moderate/weak).
2. Classify: structural shift or short-lived fad? Justify.
3. For strong+relevant signals only: what should a luggage brand consider doing?
Flag contradictions between sources. Do not add outside knowledge beyond general context.

OUTPUT: Signal Board (table), Implications, Recommended Watchlist.`,
    output: {
      kind: "insights",
      headline: "Travel signal board · SAMPLE DEMONSTRATION DATA",
      cards: [
        { title: "Signal: Regional weekend trips up", body: "Multiple sources describe growth in short regional getaways (moderate evidence). Implication: smaller sub-carry-on formats gain relevance.", tone: "positive" },
        { title: "Signal: Carry-on fee enforcement tightening", body: "Several airlines described stricter sizer checks (moderate). Implication: 'compliance confidence' messaging gains power.", tone: "positive" },
        { title: "Signal: 'Digital nomad visa' boom", body: "Single-source, weak evidence. Watchlist only — don't build yet.", tone: "neutral" },
        { title: "Contradiction flagged", body: "Source A claims premium travel recovering; Source B says trading-down continues. Treat as unresolved; monitor.", tone: "risk" },
      ],
    },
    reviewChecklist: ["Check each source's date and independence", "Weak-evidence signals stay on the watchlist, never in plans"],
    actions: [{ label: "Promote compliance signal", description: "Move 'check-in confidence' toward Product Opportunity scoring." }, { label: "Keep watchlist", description: "Nomad signal stays monitored, not actioned." }],
    loopTip: "Same template monthly makes trend diffs meaningful.",
  },

  // ─── PRODUCT ───────────────────────────────────────────────────────────────
  {
    id: "product-opportunity",
    emoji: "💡",
    title: "Product Opportunity",
    category: "Research",
    summary: "Score a candidate idea across need, gap, value and risk before committing.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Should Voyara pursue an integrated-battery version of the Voyager Pro?" },
      { title: "Information", question: "What information do we need?", answer: "Customer research themes, competitor feature audit, and battery/regulatory considerations gathered by the team." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Internal research docs and spreadsheets you upload — authorized internal information only." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Opportunity Scoring Skill: state need → cite evidence → define gap → assess value → surface risks → list open questions → recommend next investigation." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Scorecard-generation prompt with mandatory uncertainty labeling." },
      { title: "Run", question: "Analyze", answer: "Claude assembles a decision-support scorecard — not a decision." },
      { title: "Output", question: "What did Claude find?", answer: "The Opportunity Scorecard with evidence, gap, value, risk, questions and recommended next investigation.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Humans make the actual product call. Verify evidence quality and challenge the risk assessment." },
      { title: "Action", question: "What can we do next?", answer: "Commission the recommended next investigation or proceed to concept validation." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Revisit the scorecard each quarter as evidence accumulates." },
    ],
    prompt: `Using ONLY the attached research summary and competitor audit, evaluate one product opportunity for Voyara: an integrated removable battery in the Voyager Pro.

TASK — produce a scorecard:
1. Customer Need: state it in the customer's words, cite the supporting theme + mention count.
2. Evidence: strongest and weakest evidence for demand.
3. Competitive Gap: who else offers it, how credibly.
4. Potential Value: revenue logic (attach rate × price premium assumptions — LABEL AS ASSUMPTIONS).
5. Risk: regulatory, cost, weight trade-offs mentioned in the inputs.
6. Questions: what we still don't know.
7. Recommended Next Investigation: the cheapest experiment that reduces the biggest uncertainty.
Clearly separate evidence from assumption. Decision support only — the final call is ours.

OUTPUT: Scorecard format exactly as listed.`,
    output: {
      kind: "scorecard",
      title: "Opportunity Scorecard: Integrated Battery · SAMPLE DATA",
      disclaimer: "Decision support only. This scorecard informs — humans decide.",
      fields: [
        { label: "Customer Need", value: "\"Stop carrying a second power bank\" — 18% of review mentions, highest negative-sentiment cluster." },
        { label: "Evidence", value: "Strong: consistent across regions & quarters. Weak: no willingness-to-pay data collected yet." },
        { label: "Competitive Gap", value: "None of 4 audited competitors ship an integrated battery; 1 offers a sold-separately sleeve (per audit doc)." },
        { label: "Potential Value", value: "ASSUMPTION-BASED: +$40 premium × est. 20% attach on new units — requires validation before trusting." },
        { label: "Risk", value: "Airline battery rules limit capacity; added weight conflicts with our #1 complaint (packed weight)." },
        { label: "Questions", value: "Would customers accept +300g for the feature? What's real willingness-to-pay?" },
        { label: "Recommended Next Investigation", value: "Landing-page smoke test: two variants, measure signup intent — cheap, fast, decisive." },
      ],
    },
    reviewChecklist: ["Challenge the weight trade-off — it collides with our top complaint", "Confirm regulatory constraints with ops before any prototype talk"],
    actions: [{ label: "Commission the smoke test", description: "Cheapest way to resolve the biggest unknown." }, { label: "Back to Competitor Analysis", description: "Re-check whether the gap still holds this quarter." }],
    loopTip: "Scorecards improve as evidence accrues — schedule quarterly re-scoring.",
  },

  {
    id: "feature-opportunity",
    emoji: "🧩",
    title: "Feature Opportunity",
    category: "Research",
    summary: "Decide which small improvement deserves the next sprint of attention.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which of five proposed features delivers most customer value per unit effort." },
      { title: "Information", question: "What information do we need?", answer: "Support-ticket frequency by category, review themes, and engineering effort estimates from the team." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Internal ticket export (spreadsheet) and estimation doc — uploaded by the team." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Prioritization Skill: quantify demand per feature → map effort → compute value-per-effort → flag dependencies → present ranking with caveats." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Ranking prompt requiring demand citations for every score." },
      { title: "Run", question: "Analyze", answer: "Claude ranks the five features with transparent reasoning." },
      { title: "Output", question: "What did Claude find?", answer: "Ranked feature list with demand evidence and effort caveats.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Sanity-check effort estimates with engineering — Claude only relays them." },
      { title: "Action", question: "What can we do next?", answer: "Take the top-ranked feature to roadmap discussion with the evidence pack." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Re-rank whenever ticket mix shifts materially." },
    ],
    prompt: `Rank five proposed Voyager Pro improvements by customer value per unit effort, using the attached ticket export and effort estimates.

RULES
- Demand score must cite ticket counts / review themes from the data.
- Effort comes solely from the engineering doc; do not revise estimates.
- Show your ranking logic. Flag ties and near-ties.
- Note any feature whose demand evidence contradicts its popularity in team discussions.

OUTPUT: Ranked table, reasoning per row, caveats.`,
    output: {
      kind: "insights",
      headline: "Feature priority ranking · SAMPLE DATA",
      cards: [
        { title: "#1 Quieter wheels", body: "142 ticket mentions (top category) · Medium effort · Clear value-per-effort winner", tone: "positive" },
        { title: "#2 Zipper guard", body: "57 mentions, rising · Low effort · Quick win despite smaller demand", tone: "positive" },
        { title: "#3 Weight-reduction v2 shell", body: "High demand (98) but very high effort + engineering risk", tone: "neutral" },
        { title: "Contradiction flagged", body: "Integrated battery polls well internally but ticket demand is modest — popularity ≠ evidence", tone: "risk" },
      ],
    },
    reviewChecklist: ["Validate effort numbers with the engineering lead", "Confirm ticket categories weren't double-counted"],
    actions: [{ label: "Brief quieter-wheels initiative", description: "Evidence pack attached for roadmap review." }],
    loopTip: "Ticket mix shifts monthly — re-run the ranking with fresh exports.",
  },

  {
    id: "positioning",
    emoji: "🎯",
    title: "Product Positioning",
    category: "Create",
    summary: "Find the words that put you in open territory on the market map.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which positioning claim differentiates Voyara without overpromising." },
      { title: "Information", question: "What information do we need?", answer: "Competitor messaging audit, our review themes, and product capability list." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Audit docs and internal capability sheet uploaded by the team." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Positioning Skill: map claims on two axes → test each candidate against capabilities → draft statements → red-team each." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Positioning-statement generator with self-red-teaming built in." },
      { title: "Run", question: "Analyze", answer: "Claude drafts and attacks its own positioning options." },
      { title: "Output", question: "What did Claude find?", answer: "Positioning map plus three tested statement candidates.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Claims must survive legal and product scrutiny — AI drafts, humans approve." },
      { title: "Action", question: "What can we do next?", answer: "Test the winning statement in a landing-page A/B experiment." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Re-map whenever a competitor repositions; positioning is relative, not permanent." },
    ],
    prompt: `Draft positioning statements for the Voyager Pro using the attached competitor messaging audit and our capability sheet.

TASK
1. Place all brands on two axes: "Emotion-led ↔ Function-led" and "Budget ↔ Premium".
2. Identify open territory.
3. Draft 3 positioning statements for the open space. Each must be provable by a listed capability.
4. Red-team each: how would a skeptical customer attack it? Would it survive?
5. Recommend the strongest candidate and why.

OUTPUT: Map (text form), Statements, Red-team notes, Recommendation.`,
    output: {
      kind: "positioning",
      axes: { x: "Function-led ←→ Emotion-led", y: "Budget ←→ Premium" },
      points: [
        { name: "AeroCase", x: 35, y: 72 },
        { name: "NomadOne", x: 55, y: 22 },
        { name: "TrailKit", x: 62, y: 45 },
        { name: "Skyline Co", x: 28, y: 80 },
        { name: "Voyara today", x: 48, y: 58, ours: true },
        { name: "Open space", x: 68, y: 66, ours: false },
      ],
      takeaway: "Open territory: function-led premium — 'engineered confidence for frequent flyers'. Candidate: \"The carry-on engineered to pass every check, every trip.\" Survives red-team because it maps to verifiable compliance data.",
    },
    reviewChecklist: ["Every claim needs a provable capability behind it", "Legal review before external use"],
    actions: [{ label: "A/B test the statement", description: "Head-to-head landing-page experiment." }],
    loopTip: "Positioning drifts as rivals move — re-map quarterly.",
  },

  {
    id: "launch-timing",
    emoji: "📅",
    title: "Launch Timing",
    category: "Operate",
    summary: "Choose the launch window with demand tailwinds, not headwinds.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "When to launch the Voyager Pro Max given seasonality and competitive noise." },
      { title: "Information", question: "What information do we need?", answer: "Last 24 months of sales by week (authorized internal data), competitor launch history, and retail-calendar notes." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Sales spreadsheet and planning docs uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Timing Skill: extract seasonal curve → overlay competitor windows → flag collisions → recommend windows with reasoning + risks." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Seasonality analysis prompt with explicit assumption labels." },
      { title: "Run", question: "Analyze", answer: "Claude recommends launch windows ranked by fit." },
      { title: "Output", question: "What did Claude find?", answer: "Ranked windows with pros, cons and collision warnings.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Two years of history may hide anomalies; sanity-check against known events." },
      { title: "Action", question: "What can we do next?", answer: "Lock a window and back-plan the campaign calendar." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Update the seasonal curve yearly; timing models decay." },
    ],
    prompt: `Using the attached weekly sales history (24 months) and competitor launch log, recommend launch windows for a new larger carry-on.

TASK
1. Describe the seasonal demand curve; identify peaks/troughs with week ranges.
2. Overlay known competitor launches; flag collision weeks.
3. Recommend 3 windows ranked best-first, each with: rationale, main risk, and ASSUMPTIONS labeled.
Base recommendations strictly on provided data. Note data limitations (e.g., only two annual cycles).

OUTPUT: Seasonal Curve, Collision Calendar, Ranked Windows.`,
    output: {
      kind: "insights",
      headline: "Launch window recommendation · SAMPLE DATA",
      cards: [
        { title: "🥇 Early September", body: "Pre-holiday build-up begins; zero logged competitor launches; risk: back-to-school budget fatigue (ASSUMED moderate)", tone: "positive" },
        { title: "🥈 Mid-January", body: "Post-holiday travel-planning spike in searches; risk: industry-wide CES noise drowns paid spend", tone: "neutral" },
        { title: "🥉 Late October", body: "Peak gift intent BUT 3 competitor launches collide — worst visibility odds", tone: "risk" },
        { title: "Data caveat", body: "Only 2 seasonal cycles in history — treat curves as indicative, not predictive", tone: "neutral" },
      ],
    },
    reviewChecklist: ["Cross-check against known events not in the data (strikes, expo dates)", "Confirm competitor log is complete"],
    actions: [{ label: "Lock September, back-plan campaign", description: "Jump to Campaign Planning with the date set." }],
    loopTip: "Refresh the seasonal curve every January with the full prior year.",
  },

  // ─── CREATE ────────────────────────────────────────────────────────────────
  {
    id: "campaign-planning",
    emoji: "📢",
    title: "Campaign Planning",
    category: "Create",
    summary: "From one insight to a complete multi-channel campaign canvas.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "What campaign concept turns 'check-in confidence' insight into booked revenue this quarter." },
      { title: "Information", question: "What information do we need?", answer: "The competitor gap insight, audience profile, product capabilities, and channel performance history." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Prior research docs and channel-performance spreadsheet — internal uploads." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Campaign Builder Skill: concept → headlines → ad copy → social → email → website → CTA, each derived from ONE customer insight." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Full builder prompt anchoring every asset to the chosen insight." },
      { title: "Run", question: "Generate", answer: "Claude assembles the complete campaign canvas." },
      { title: "Output", question: "What did Claude create?", answer: "Concept, headlines, ad copy, social posts, email, website copy and CTA as designed cards.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Brand voice, claim accuracy, and cultural fit — humans approve everything that ships." },
      { title: "Action", question: "What can we do next?", answer: "Send assets to production; wire the CTA into analytics for measurement." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "After measurement, the optimization loop improves the next version." },
    ],
    prompt: `Build a complete campaign for Voyara's Voyager Pro around this validated insight: "Frequent flyers fear the gate check-in moment more than the flight."

AUDIENCE: Frequent economy flyers, 25–45, who fly 6+ times/year.
CHANNELS: Paid social, Instagram, YouTube pre-roll, email, website hero.
REQUIREMENTS
1. One campaign concept sentence everything derives from.
2. 5 headline options with different psychological angles.
3. Ad copy (primary text + description) for paid social.
4. 3 Instagram post concepts + 1 YouTube hook.
5. Email: subject, preheader, body outline, CTA.
6. Website hero copy.
7. Single unified CTA.
Anchor EVERY asset to the insight. No generic travel clichés ("adventure awaits" banned). Keep claims truthful to the capability sheet.

OUTPUT: Campaign Canvas with numbered sections above.`,
    output: {
      kind: "campaignCanvas",
      concept: "THE GATE MOMENT — We make the most anxious ten seconds of flying feel like a formality.",
      pieces: [
        { kind: "Headlines", title: "Five angles, one insight", body: "1. \"Board with confidence, not crossed fingers.\" · 2. \"It fits. It always fits.\" · 3. \"The end of gate-check roulette.\" · 4. \"Engineered for the sizer box.\" · 5. \"Your seat stays overhead. So does your bag.\"" },
        { kind: "Paid Social", title: "Primary text + description", body: "Primary: \"You've done the trip a hundred times. The sizer box shouldn't be the suspenseful part. Voyager Pro — measured to fit major carriers' carry-on limits. See the fit data →\" Description: \"Fit-tested. Frequent-flyer approved.\"" },
        { kind: "Instagram", title: "Carousel: 'Anatomy of the Gate Moment'", body: "Slide 1: traveler approaching sizer, tense. Slide 2–4: bag slides in cleanly, close-ups of compliant dimensions. Slide 5: relief smile + \"Measured to fit. Check the data.\"" },
        { kind: "YouTube Pre-roll", title: "6-second hook", body: "Slow-mo bag entering sizer frame, sound of clean click. VO: \"Some bags hope. This one fits.\" Skip-proof: payoff lands by second 5." },
        { kind: "Website Hero", title: "Above-the-fold", body: "H1: \"The carry-on engineered to pass every check.\" Sub: \"Voyager Pro — fit-measured against major airline carry-on limits, with modular packing that keeps you under weight caps.\" CTA button: \"See the fit data\"" },
      ],
    },
    reviewChecklist: ["Verify fit claims match published airline limits", "Brand-voice review by a human before anything ships", "Legal check on comparative wording"],
    actions: [{ label: "Draft the email asset", description: "Extend the canvas into the full Email Marketing preview." }, { label: "Spin up social variants", description: "Generate the platform-specific post board." }, { label: "Wire up analytics", description: "Define success metrics before launch." }],
    loopTip: "After two weeks live, run Campaign Analysis and feed learnings into Optimization Loop.",
  },

  {
    id: "copywriting",
    emoji: "✍️",
    title: "Copywriting",
    category: "Create",
    summary: "Platform-aware, goal-driven copy variants — with the prompt that produced them.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which Instagram caption style converts scrollers into product-page visitors for the launch." },
      { title: "Information", question: "What information do we need?", answer: "Campaign concept, platform norms knowledge, goal definition, and tone guidance from the brand book." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Brand voice guide document uploaded by the team." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Copywriting Skill: parse platform+goal+tone → apply structure patterns → write 3 variants with distinct mechanisms → annotate why each works." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Parameterized copy prompt — swap platform/goal/tone to regenerate." },
      { title: "Run", question: "Generate", answer: "Claude writes three mechanistically-different variants." },
      { title: "Output", question: "What did Claude write?", answer: "Input → Prompt → Output view with annotated variants.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Voice consistency, claim truthfulness, and platform character limits." },
      { title: "Action", question: "What can we do next?", answer: "A/B test top two variants in the actual channel." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Winning variant mechanics feed the brand book — the skill improves." },
    ],
    prompt: `Write 3 Instagram caption variants for the Voyager Pro launch.

PARAMETERS
- Platform: Instagram (hook in first 60 chars, line breaks for scannability)
- Goal: Consideration — drive product-page visits
- Tone: Confident, technical-but-human
- Insight anchor: fear of the gate check-in moment
- Constraints: ≤150 words each; one CTA each; no exclamation-mark spam; claims limited to the capability sheet.

For EACH variant, add a one-line annotation: which persuasion mechanism it uses (e.g., tension-release, social proof, specificity).

OUTPUT: Variant A/B/C with annotations.`,
    output: {
      kind: "copyLab",
      platform: "Instagram",
      goal: "Consideration",
      tone: "Confident, technical-but-human",
      variants: [
        { angle: "Tension-release", copy: "The gate agent waves you forward.\n\nMost travelers feel a flicker of doubt. Voyager Pro riders don't.\n\nFit-measured against major carry-on limits. Modular cubes keep weight in check. You wheel up, slide it in, walk on.\n\nSee the fit data → link in bio" },
        { angle: "Specificity", copy: "47 cm × 36 cm × 20 cm.\n\nThose numbers are the difference between overhead bin and gate-check limbo. The Voyager Pro was designed around them — then tested until it passed every time.\n\nMeasurements, materials and fit data on the product page. Link in bio." },
        { angle: "Social proof", copy: "The best part of a red-eye?\n\nNot fighting for bin space. Voyager Pro travelers report walking on late and still strolling off first — bag overhead, hands free, coffee intact.\n\nJoin them. Fit data and specs → link in bio" },
      ],
    },
    reviewChecklist: ["First 60 chars must survive truncation", "Confirm 'travelers report' claims trace to real reviews"],
    actions: [{ label: "A/B test variants A vs B", description: "Set up the experiment with clear success metrics." }, { label: "Regenerate for another platform", description: "Swap parameters — same skill, new output." }],
    loopTip: "Log winning mechanisms back into the brand book after each test.",
  },

  {
    id: "ad-creation",
    emoji: "📣",
    title: "Ad Creation",
    category: "Create",
    summary: "Paid-social ad sets with hooks, primary text and creative direction.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which ad hook earns the click for cold audiences unfamiliar with Voyara." },
      { title: "Information", question: "What information do we need?", answer: "Campaign concept, audience definition, and past ad-performance patterns from the ad account export." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Exported ad-account report (spreadsheet) uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Ad Creation Skill: hook brainstorm → filter against audience psychology → pair hooks with bodies → specify visual direction → define test structure." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Ad-set prompt with hook-diversity requirement." },
      { title: "Run", question: "Generate", answer: "Claude produces a structured test-ready ad set." },
      { title: "Output", question: "What did Claude create?", answer: "Three-hook ad set with creative directions and a test plan.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Policy compliance (no prohibited claims), brand safety, and landing-page congruence." },
      { title: "Action", question: "What can we do next?", answer: "Load into the ad platform; let the test decide." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Winning hooks join a swipe file that seeds future generations." },
    ],
    prompt: `Create a cold-audience ad set for Voyager Pro (frequent flyers, 25–45, no brand awareness).

STRUCTURE PER AD
- Hook (first line, must stop the scroll)
- Primary text (≤90 words)
- Description (≤30 chars)
- Visual direction (one paragraph)

DIVERSITY REQUIREMENT
Hook 1: problem-agitation. Hook 2: curiosity gap. Hook 3: contrarian take.
Then propose how to split budget across the three for a clean 2-week test.

CONSTRAINTS: Truthful to capability sheet only; no superlatives we can't substantiate.

OUTPUT: Ads 1–3, Test Structure.`,
    output: {
      kind: "insights",
      headline: "Cold-audience ad set · SAMPLE CREATIVE",
      cards: [
        { title: "Ad 1 · Problem-agitation", body: "HOOK: \"That sinking feeling when the agent eyes your bag.\"\nBody: Every frequent flyer knows it. The sizer box shouldn't be a lottery. Voyager Pro is fit-measured against major carry-on limits — so the gate moment is a formality.\nVisual: POV shot approaching the sizer, tense music cuts to calm click.", tone: "neutral" },
        { title: "Ad 2 · Curiosity gap", body: "HOOK: \"There's a reason this bag never gets gate-checked.\"\nBody: It isn't luck. It's 47×36×20 centimeters, engineered padding geometry, and packing cubes that keep weight where it belongs. The data's on the product page.\nVisual: exploded-view animation of the shell layers.", tone: "neutral" },
        { title: "Ad 3 · Contrarian", body: "HOOK: \"Stop buying luggage for looks.\"\nBody: Pretty bags fail sizers. Voyager Pro starts where others stop: compliance engineering, then design. Form follows the fit data.\nVisual: side-by-side silhouette passing/failing a schematic sizer.", tone: "neutral" },
        { title: "Test structure", body: "Week 1–2: equal 33% budget split, same audience, same placements. Kill rule: pause any ad with CTR < 50% of set average after 3 days. Read-out: hook mechanism, not just winner.", tone: "positive" },
      ],
    },
    reviewChecklist: ["Check platform ad policies for comparative claims", "Ensure landing page matches each hook's promise"],
    actions: [{ label: "Plan the read-out", description: "Schedule Campaign Analysis for day 14." }],
    loopTip: "Feed winning hooks into a swipe file — future ad generation starts stronger.",
  },

  {
    id: "social-media",
    emoji: "📱",
    title: "Social Media",
    category: "Create",
    summary: "A week of platform-native content: Instagram posts, YouTube titles, shorts and captions.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "What should Voyara post this week to sustain launch momentum organically." },
      { title: "Information", question: "What information do we need?", answer: "Campaign concept, past top-performing posts, and platform-format requirements." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Social-analytics export uploaded internally. Platform examples here are illustrative channels, not claimed integrations." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Content Calendar Skill: mix formats → adapt one insight to each platform's native grammar → sequence across the week → vary CTAs." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Weekly-content-batch prompt with format constraints per platform." },
      { title: "Run", question: "Generate", answer: "Claude fills a seven-day board with native-format drafts." },
      { title: "Output", question: "What did Claude create?", answer: "Instagram post, YouTube titles, short-form idea, caption and CTA as styled cards.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Visual feasibility, community-tab etiquette, and that scheduled posts don't repeat the same angle." },
      { title: "Action", question: "What can we do next?", answer: "Approve, produce assets, schedule." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Weekly batch becomes a Wednesday routine; performance feeds next week's mix." },
    ],
    prompt: `Create a 7-day organic content batch for Voyara launching the Voyager Pro.

PLATFORMS & FORMATS
- Instagram: 2 feed posts, 1 carousel, 1 reel concept
- YouTube: 3 title+thumbnail-concept options for a founder video
- Short-form: 1 TikTok-style idea (15s, hook-first)
- 1 campaign caption reusable across platforms

RULES
Each piece adapts THE SAME insight (gate-moment anxiety) to its platform's grammar. Vary the angle per piece. Include posting-day suggestion per item. Respect realistic length limits.

OUTPUT: Day-by-day board.`,
    output: {
      kind: "socialBoard",
      posts: [
        { platform: "Instagram", headline: "Feed · Mon — \"Sizer confession\"", body: "Photo dump: 5 real gate moments from team trips. Caption opens: \"We've all stood in that line doing mental math…\" CTA: share your gate story." },
        { platform: "YouTube", headline: "Title option B (recommended)", body: "\"We Measured Our Suitcase Against Every Major Airline (Here's What Happened)\" — thumbnail: engineer with calipers beside sizer frame, shocked face." },
        { platform: "Short-form", headline: "Reel/TikTok · Wed — 15s", body: "Hook (0–2s): bag SLAMS into slow-mo sizer. Text: \"POV: you did your homework.\" Payoff: calm walk-on. Sound: trending minimal beat." },
        { platform: "Campaign caption", headline: "Reusable caption", body: "\"Designed around the dimensions that decide your flight. Voyager Pro — fit-measured, cube-organized, gate-moment proof. Data on the product page.\" CTA: link in bio." },
        { platform: "CTA", headline: "Week-driving CTA", body: "\"Comment your worst gate-check story — best one wins a packing-cube set. Winners announced Sunday.\"" },
      ],
    },
    reviewChecklist: ["Contest mechanics comply with platform promotion rules", "Founder video claims match the capability sheet"],
    actions: [{ label: "Schedule the week", description: "Hand approved drafts to production." }, { label: "Draft the email companion", description: "Reuse the week's best angle for subscribers." }],
    loopTip: "Wednesday content batch = standing Routine slot. Same skill, fresh insight anchor each week.",
  },

  {
    id: "website-content",
    emoji: "🌐",
    title: "Website Content",
    category: "Create",
    summary: "Hero, benefits and FAQ copy that answers objections in order of urgency.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Does the product page answer visitors' top doubts before they bounce?" },
      { title: "Information", question: "What information do we need?", answer: "Current page copy, review themes (objection goldmine), and heat-scroll notes from analytics." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Page HTML/text export and review-theme doc uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Web Copy Skill: map objections → order by drop-off severity → write section copy answering each → tighten hero for 5-second clarity." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Objection-first rewrite prompt." },
      { title: "Run", question: "Generate", answer: "Claude restructures the page around answered doubts." },
      { title: "Output", question: "What did Claude create?", answer: "Hero, benefit blocks and FAQ mapped to specific objections.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Accuracy of every spec mentioned; SEO keywords preserved where they matter." },
      { title: "Action", question: "What can we do next?", answer: "Implement behind an A/B test against the current page." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Quarterly rewrite cycle fed by fresh review themes." },
    ],
    prompt: `Rewrite the Voyager Pro product page copy using the attached current copy and review-theme analysis.

TASK
1. Hero: sharpen to communicate fit-confidence in under 12 words + one sub-line.
2. Benefits: 3 blocks, each answering a TOP objection from review themes (weight, scuffs, zipper).
3. FAQ: 6 questions ordered by objection frequency, answers ≤50 words.
Preserve existing SEO terms: "carry-on luggage", "polycarbonate", "packing cubes". Claims limited to capability sheet.

OUTPUT: Hero, Benefit Blocks, FAQ.`,
    output: {
      kind: "insights",
      headline: "Objection-first page rewrite · SAMPLE COPY",
      cards: [
        { title: "Hero (9 words)", body: "\"Passes checks. Packs smart. Looks sharp doing it.\"\nSub: Fit-measured against major carry-on limits — see the data.", tone: "positive" },
        { title: "Benefit block 1 → weight objection", body: "\"Under the limit, even packed properly.\" Modular cubes distribute load; typical week-long pack stays within common cabin allowances. Show sample packing list.", tone: "neutral" },
        { title: "Benefit block 2 → scuff objection", body: "\"Year-two good looks.\" Textured shell hides minor scuffs; care kit included keeps it that way.", tone: "neutral" },
        { title: "FAQ top question", body: "\"Will it fit my airline?\" — Compare the 47×36×20 cm frame against our published carrier table; 92% of major routes covered. (SAMPLE FIGURE)", tone: "neutral" },
      ],
    },
    reviewChecklist: ["Every stat on the page must be real and sourced", "SEO term placement checked"],
    actions: [{ label: "Ship behind an A/B test", description: "Old page vs objection-first page, 50/50." }],
    loopTip: "Feed quarterly review themes into the rewrite — the page evolves with customers.",
  },

  {
    id: "email-marketing",
    emoji: "📧",
    title: "Email Marketing",
    category: "Create",
    summary: "Subject, preheader, body and CTA — switchable between output and rationale.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Will a waitlist email convert previous browsers into launch-day buyers?" },
      { title: "Information", question: "What information do we need?", answer: "Segment definition (past browsers), campaign objective, and brand voice guide." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "ESP segment export and brand docs uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Email Craft Skill: subject stack → preheader pairing → body arc (recap→proof→offer→CTA) → fallback rendering notes." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Email prompt with subject-line diversity requirement." },
      { title: "Run", question: "Generate", answer: "Claude drafts the complete send-ready package." },
      { title: "Output", question: "What did Claude write?", answer: "Full email preview with PROMPT / OUTPUT / WHY THIS WORKS views.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Deliverability hygiene (spam-trigger words), segment accuracy, offer legality." },
      { title: "Action", question: "What can we do next?", answer: "A/B subject lines, then schedule the send." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Open/click results refine future subject strategies — part of Thursday review." },
    ],
    prompt: `Write a launch-waitlist email for Voyara's Voyager Pro.

SEGMENT: Browsers who viewed the product page ≥2 times in 90 days but didn't buy.
OBJECTIVE: Launch-day conversion (pre-order click).
DELIVERABLES
- 3 subject lines: curiosity / direct / urgency (≤42 chars)
- 1 preheader per subject (≤80 chars)
- Body ≤180 words: acknowledge their visit, present the fit-data proof, pre-order incentive, single CTA
- Fallback: plain-text-friendly structure
Constraints: claims from capability sheet only; no false scarcity.

OUTPUT: Subject Stack, Chosen Pairing, Body, CTA.`,
    output: {
      kind: "emailPreview",
      subject: "The bag you kept checking is almost here",
      preheader: "Fit-measured. Cube-packed. Pre-orders open Thursday 9am.",
      audience: "Repeat product-page browsers, no purchase (90 days)",
      objective: "Launch-day pre-order conversion",
      body: [
        "Hi {first_name},\n\nYou've looked at the Voyager Pro more than once. Fair — it's worth a second look.\n\nSince your last visit, we published the full fit data: measured against major airlines' carry-on limits, with modular cubes that keep a week's packing inside common weight caps.\n\nThursday 9am, pre-orders open. Waitlist members like you get first access and the founding-member price.\n\n[SEE THE FIT DATA →]",
      ],
      cta: "SEE THE FIT DATA → (links to product page)",
      whyItWorks: [
        "Subject acknowledges observed behavior ('kept checking') — personal without being creepy",
        "Proof before ask: fit data precedes the offer, matching a high-consideration purchase",
        "Single CTA removes choice paralysis; plain-text-friendly survives clipping",
      ],
    },
    reviewChecklist: ["Spam-word scan before scheduling", "Confirm the segment excludes recent purchasers"],
    actions: [{ label: "A/B the subjects", description: "Curiosity vs direct, 20% send each." }],
    loopTip: "Thursday routine reads open/click results and refines the next send.",
  },

  // ─── OPTIMIZE ──────────────────────────────────────────────────────────────
  {
    id: "campaign-analysis",
    emoji: "📊",
    title: "Campaign Analysis",
    category: "Optimize",
    summary: "What worked, what didn't, why — and what to test next.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Why did the launch campaign hit CTR targets but miss conversion targets?" },
      { title: "Information", question: "What information do we need?", answer: "Two-week campaign export: impressions, clicks, sessions, add-to-carts, purchases, spend — by ad and channel." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Ad-platform + analytics exports (spreadsheets) uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Funnel Diagnosis Skill: compute stage conversions → isolate weakest stage → correlate with creatives/channels → generate hypotheses → prescribe tests." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Diagnosis prompt forbidding causal certainty." },
      { title: "Run", question: "Analyze", answer: "Claude localizes the funnel leak and proposes experiments." },
      { title: "Output", question: "What did Claude find?", answer: "Metrics board + WHAT WORKED / DIDN'T / POSSIBLE REASONS / TEST NEXT.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Tracking integrity first — attribution quirks explain many 'mysteries'; correlation ≠ causation." },
      { title: "Action", question: "What can we do next?", answer: "Launch the prescribed experiment via the Optimization Loop." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Friday ritual: analyze → optimize → next week's campaign inherits learnings." },
    ],
    prompt: `Diagnose this launch campaign from the attached 14-day export.

DATA: Spend, impressions, clicks, landing sessions, add-to-carts, purchases — overall and by ad (3 hooks) and channel.

TASK
1. Compute stage-through rates (CTR, session rate, ATC rate, purchase rate); compare to the targets in the brief tab.
2. Identify the weakest stage and quantify the gap.
3. Break down by ad and channel: where does the leak concentrate?
4. Generate 3 hypotheses for the gap. Each hypothesis must cite the data pattern supporting it.
5. Prescribe one experiment per hypothesis with a success metric.

IMPORTANT: Frame causes as hypotheses, not conclusions. Sample data for demonstration.

OUTPUT: Stage Funnel, By-Ad/Channel Table, Hypotheses, Experiments.`,
    output: {
      kind: "analytics",
      disclaimer: "SAMPLE CAMPAIGN DATA — FOR DEMONSTRATION ONLY. Not a forecast or guarantee of results.",
      metrics: [
        { label: "CTR", value: "2.4%", delta: 20, good: true },
        { label: "Session→ATC", value: "9.1%", delta: -18, good: false },
        { label: "Conversion", value: "0.9%", delta: -31, good: false },
        { label: "Engagement rate", value: "4.7%", delta: 12, good: true },
        { label: "Reach", value: "1.2M", delta: 35, good: true },
        { label: "Cost per click", value: "$0.86", delta: -9, good: true },
        { label: "Revenue (sample)", value: "$41.3K", delta: -8, good: false },
      ],
      worked: [
        "Hook 2 (curiosity gap) drove 44% of clicks at lowest CPC",
        "Instagram placements out-delivered YouTube on engagement",
        "Reach exceeded plan by a third — awareness goal met",
      ],
      didnt: [
        "Session→add-to-cart fell 18% below target",
        "Overall conversion missed by nearly a third",
        "Mobile traffic bounced hardest on the shipping-cost reveal",
      ],
      reasons: [
        "HYPOTHESIS A: unexpected shipping cost at checkout kills mobile momentum (bounce pattern concentrated at cart step)",
        "HYPOTHESIS B: Hook 2 attracts curious-but-unqualified clickers — engaged but rarely buying",
        "HYPOTHESIS C: landing page buries the fit-data proof that ads promised",
      ],
      testNext: [
        "Experiment 1: show shipping early on product page vs at checkout",
        "Experiment 2: retarget Hook-2 clickers with proof-heavy creative before conversion asks",
        "Experiment 3: landing variant leading with the fit-data table",
      ],
    },
    reviewChecklist: ["Verify tracking/attribution before trusting funnel math", "Remember: hypotheses need experiments, not opinions"],
    actions: [{ label: "Enter the Optimization Loop", description: "Turn Experiment 1 into a structured test." }, { label: "Rebalance budget", description: "Shift weight toward proven hooks while tests run." }],
    loopTip: "Friday afternoon: same diagnosis template, latest export. Learnings compound.",
  },

  {
    id: "cost-analysis",
    emoji: "💰",
    title: "Marketing Cost Analysis",
    category: "Optimize",
    summary: "Where the budget actually went, what it bought, and what to reallocate.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Which channels earn their budget and which are subsidized by the rest." },
      { title: "Information", question: "What information do we need?", answer: "Quarterly spend by channel and activity, with output metrics per line (authorized finance/marketing exports)." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Finance-approved spend spreadsheet uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Cost Decomposition Skill: group spend → attach outputs → compute efficiency ratios → flag anomalies → suggest reallocation scenarios (labeled as scenarios)." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Cost-efficiency prompt requiring scenario framing, never directives." },
      { title: "Run", question: "Analyze", answer: "Claude decomposes the quarter's budget efficiency." },
      { title: "Output", question: "What did Claude find?", answer: "Efficiency board with reallocation scenarios.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Attribution model biases; financial decisions belong to humans with full context." },
      { title: "Action", question: "What can we do next?", answer: "Present scenarios in the budget review; decide together." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Monthly cost review keeps allocation honest." },
    ],
    prompt: `Decompose Q3 marketing spend (attached, finance-approved export) by efficiency.

TASK
1. Group spend: paid social, search, creators, tools, content production.
2. Attach available output metric per group (from the export only).
3. Compute efficiency ratios where data allows; mark N/A where not.
4. Flag anomalies (spikes, misclassifications, duplicate entries).
5. Offer 2 reallocation SCENARIOS with expected trade-offs. Clearly label assumptions and limits. These are scenarios for human decision-making, not recommendations.

OUTPUT: Spend Map, Efficiency Ratios, Anomalies, Scenarios A/B.`,
    output: {
      kind: "insights",
      headline: "Q3 budget decomposition · SAMPLE DATA · DECISION SUPPORT ONLY",
      cards: [
        { title: "Efficient: Paid social retargeting", body: "$18K → 61% of assisted conversions. Cost per assisted conversion well below blended average.", tone: "positive" },
        { title: "Unclear: Creator program", body: "$22K spent, outputs tracked only as reach. Efficiency ratio: N/A — instrumentation gap, not necessarily waste.", tone: "neutral" },
        { title: "Anomaly flagged", body: "Tools spend doubled in August — includes a duplicated subscription invoice ($480). Worth a finance query.", tone: "risk" },
        { title: "Scenario A (shift $5K)", body: "Move creator budget → retargeting. ASSUMES creator impact is truly untracked; risks losing upper-funnel effect.", tone: "neutral" },
        { title: "Scenario B (instrument first)", body: "Add tracking codes to creator links for one quarter, THEN reallocate on evidence. Slower, lower regret.", tone: "positive" },
      ],
    },
    reviewChecklist: ["Financial decisions need human owners — this is scenario material", "Confirm the duplicate invoice finding with finance"],
    actions: [{ label: "Take Scenario B to budget review", description: "Instrument first, reallocate on evidence." }],
    loopTip: "Monthly cost review = standing Routine slot; anomalies caught early cost less.",
  },

  {
    id: "sales-insights",
    emoji: "📈",
    title: "Sales Insights",
    category: "Operate",
    summary: "Connect marketing activity to pipeline reality — without overclaiming credit.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Did campaign-exposed cohorts buy differently than unexposed ones?" },
      { title: "Information", question: "What information do we need?", answer: "Order-level sales data tagged by exposure cohort (marketing + sales authorized export)." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Authorized internal sales database export — uploaded by the team." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Cohort Comparison Skill: define cohorts → compare rates/AOV → control for obvious confounders where data allows → state limits honestly." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Cohort prompt with mandatory limitations section." },
      { title: "Run", question: "Analyze", answer: "Claude compares cohorts and quantifies what the data supports." },
      { title: "Output", question: "What did Claude find?", answer: "Cohort comparison with honest causal caveats.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Exposure tagging accuracy; seasonality confounders; never equate correlation with causation." },
      { title: "Action", question: "What can we do next?", answer: "Share with sales leadership; design a cleaner holdout test next quarter." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Quarterly cohort reads build a real effectiveness picture over time." },
    ],
    prompt: `Compare purchase behavior between campaign-exposed and unexposed cohorts (attached order export).

DEFINITIONS
- EXPOSED: clicked or viewed campaign creative (per tracking tag)
- UNEXPOSED: matched customers with no exposure tag

TASK
1. Purchase rate and average order value per cohort.
2. Product-mix differences.
3. Simple controls the data allows (region, new-vs-returning).
4. LIMITATIONS section: list every confounder you could NOT control. State plainly whether marketing can claim lift from this data alone.

OUTPUT: Cohort Table, Differences, Limitations, Verdict on Claim Strength.`,
    output: {
      kind: "insights",
      headline: "Cohort comparison · SAMPLE DATA",
      cards: [
        { title: "Purchase rate", body: "Exposed 3.8% vs unexposed 2.9% — a 0.9pt raw difference", tone: "positive" },
        { title: "AOV", body: "Exposed $312 vs unexposed $287 — exposed buyers add accessories more often", tone: "positive" },
        { title: "Confounder found", body: "Exposed cohort skews urban (faster shipping). Region control shrinks the gap to ~0.5pt", tone: "risk" },
        { title: "Honest verdict", body: "Data SUGGESTS positive association, cannot PROVE incremental lift. A geographic holdout test next quarter would settle it", tone: "neutral" },
      ],
    },
    reviewChecklist: ["Verify exposure tags aren't contaminated", "Insist on the holdout design before claiming lift externally"],
    actions: [{ label: "Design the holdout test", description: "Regions-based experiment for clean causality." }],
    loopTip: "Quarterly cohort reads + annual holdouts = compounding measurement maturity.",
  },

  {
    id: "ab-testing",
    emoji: "🧪",
    title: "A/B Testing",
    category: "Optimize",
    summary: "Well-formed experiments: hypothesis, power, duration, decision rules — before you launch.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "Does showing shipping costs earlier actually recover the checkout leak found in Campaign Analysis?" },
      { title: "Information", question: "What information do we need?", answer: "Baseline conversion rate, traffic volume, and minimum detectable effect tolerance from analytics." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Analytics baseline export uploaded internally." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Experiment Design Skill: hypothesis → primary metric → MDE → sample/duration math → guardrails → decision rules → kill criteria." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Experiment-design prompt enforcing statistical discipline." },
      { title: "Run", question: "Design", answer: "Claude returns a complete, launchable test protocol." },
      { title: "Output", question: "What did Claude create?", answer: "The experiment card: hypothesis, change, measurement, criteria, timeline.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Sample-size math with an external calculator; ensure no overlapping tests pollute results." },
      { title: "Action", question: "What can we do next?", answer: "Implement variant, launch test, resist peeking." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "Every completed test updates the learning log — the Optimization Loop's memory." },
    ],
    prompt: `Design an A/B test from this hypothesis: "Showing estimated shipping on the product page (vs revealing at checkout) increases purchase completion for mobile visitors."

PROVIDED BASELINE: 0.9% mobile conversion, ~46,000 mobile sessions/week.

DELIVER
1. Formal hypothesis (null + alternative).
2. Primary metric + 2 guardrail metrics.
3. Minimum detectable effect: 15% relative lift. Compute required sample per arm and expected duration. State formula assumptions simply.
4. Randomization unit and exclusions.
5. Decision rules BEFORE launch: what result ships, what kills the idea, what triggers iteration.
No peeking clause included.

OUTPUT: Protocol as numbered sections.`,
    output: {
      kind: "experiment",
      hypothesis: "Early shipping-cost display increases mobile purchase completion ≥15% relative (0.9% → ≥1.035%), because cost surprise is removed from the final step.",
      change: "Variant B: product page shows estimated shipping from the ATC moment onward. Control A: unchanged (shipping revealed at checkout).",
      measure: "Primary: mobile purchase completion rate. Guardrails: ATC rate (no suppression), refund rate 30d, page load time.",
      successCriteria: "Ship if lift ≥ +15% relative with p<0.05 at planned horizon. Iterate if directionally positive but flat. Kill if guardrails degrade >5%.",
      timeline: "~46K sessions/wk ÷ arms ≈ 23K each; at baseline 0.9%, MDE 15%, two-sided α=0.05, power 80% → approx 2.5–3 weeks. Do not conclude early.",
    },
    reviewChecklist: ["Double-check sample math with a standard calculator", "Pause conflicting experiments during the window"],
    actions: [{ label: "Launch the protocol", description: "Brief engineering; calendar the read-out date." }],
    loopTip: "Completed tests feed the learning log — the loop remembers, humans compound.",
  },

  {
    id: "optimization",
    emoji: "🔄",
    title: "Campaign Optimization",
    category: "Optimize",
    summary: "Close the loop: result → insight → experiment → new campaign → measure → learn.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "How to convert last campaign's diagnosis into a measurably better next flight." },
      { title: "Information", question: "What information do we need?", answer: "Campaign analysis output, experiment results, and updated audience insights." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "All prior workflow artifacts — internal docs and exports." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Optimization Loop Skill: digest result → crystallize insight → design next experiment → spec the improved campaign → define measurement plan." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Loop-closure prompt chaining all artifacts." },
      { title: "Run", question: "Synthesize", answer: "Claude produces the next-cycle plan rooted in evidence." },
      { title: "Output", question: "What did Claude create?", answer: "The loop card: result → insight → experiment → new campaign.", },
      { title: "Review", question: "What should the marketer verify?", answer: "That the insight actually follows from the evidence — loops amplify errors too." },
      { title: "Action", question: "What can we do next?", answer: "Execute the new flight; measurement is already specified." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "This IS the loop — each cycle compounds into the routine." },
    ],
    prompt: `Close the optimization loop using three attached artifacts: Campaign Analysis (funnel leak at checkout), Experiment 1 result (early shipping display: +19% completion, shipped), and refreshed audience notes.

TASK
1. RESULT: summarize what we now know in 2 sentences.
2. INSIGHT: the transferable principle behind the win.
3. NEXT EXPERIMENT: the logical adjacent question worth testing.
4. NEW CAMPAIGN SPEC: how the next flight changes (creative, landing, sequencing) BECAUSE of the insight.
5. MEASUREMENT PLAN: what proves cycle-over-cycle improvement.
Chain explicitly: cite which artifact each conclusion draws from.

OUTPUT: Result, Insight, Next Experiment, New Campaign Spec, Measurement Plan.`,
    output: {
      kind: "experiment",
      hypothesis: "If cost transparency drove the lift, then showing TOTAL landed price (incl. duties estimate) from first touch will further raise completion for international traffic — the surprise wasn't just shipping.",
      change: "Next flight: all creatives lead with 'all-in price' badge; landing page adds duty estimator for non-domestic visitors.",
      measure: "Completion rate by geography, return-ad efficiency, and support tickets mentioning unexpected charges (should fall).",
      successCriteria: "International completion +10% relative vs last flight; charge-surprise tickets −30%. Two-week flight, fixed read-out date.",
      timeline: "RESULT: early-shipping test won (+19%) → INSIGHT: buyers reward price honesty early → EXPERIMENT: total-price transparency → NEW FLIGHT: transparency-led creative suite → MEASURE: geo-split completion + ticket volume → LEARN → repeat ↺",
    },
    reviewChecklist: ["Confirm the insight transfers beyond this campaign's specifics", "Guard against overfitting to one win"],
    actions: [{ label: "Run the transparency flight", description: "Creative and landing changes are specified." }, { label: "Book the read-out", description: "Fixed date; no peeking." }],
    loopTip: "Loops beat one-offs: same artifacts chain every cycle, learnings compound.",
  },

  {
    id: "weekly-intelligence",
    emoji: "📋",
    title: "Weekly Marketing Intelligence",
    category: "Operate",
    summary: "One consolidated Monday briefing: market, competitors, customers, performance.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "What changed this week that matters — across all intelligence streams at once." },
      { title: "Information", question: "What information do we need?", answer: "The week's accumulated inputs: review deltas, competitor snapshots, performance exports, trend notes." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Whatever the team collected during the week — documents and spreadsheets uploaded together." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Intelligence Briefing Skill: ingest all streams → dedupe → prioritize by decision-relevance → one-page brief → open questions for humans." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Consolidation prompt with a strict one-page limit." },
      { title: "Run", question: "Synthesize", answer: "Claude compresses a week of noise into one actionable brief." },
      { title: "Output", question: "What did Claude produce?", answer: "Monday briefing: top movements, decisions needed, watch items.", },
      { title: "Review", question: "What should the marketer verify?", answer: "That prioritization matches business priorities — importance is a human judgment." },
      { title: "Action", question: "What can we do next?", answer: "Route each decision to its owner in Monday's meeting." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "This IS the routine's capstone — every weekday feeds Monday." },
    ],
    prompt: `Consolidate this week's marketing inputs (attached bundle: review delta, 2 competitor snapshots, performance export, 3 trend notes) into a one-page briefing.

STRUCTURE
1. MOVED: the 3 most decision-relevant changes, each with source.
2. DECISIONS NEEDED: what requires a human call this week, with options.
3. WATCH: notable but not urgent.
4. OPEN QUESTIONS: what the data couldn't answer.

Hard limit: 400 words. Prioritize by decision-relevance, not volume of mentions. Mark uncertain items UNCERTAIN.

OUTPUT: The briefing, exactly in that structure.`,
    output: {
      kind: "insights",
      headline: "Monday Briefing · Week 34 · SAMPLE DEMONSTRATION DATA",
      cards: [
        { title: "① MOVED", body: "Zipper-snag complaints doubled again (7→15). AeroCase cut prices 12% on their lightest model. Our checkout completion held post-fix (+19% confirmed).", tone: "risk" },
        { title: "② DECISIONS NEEDED", body: "Respond to AeroCase price cut? Options: hold (evidence: buyers cite organization, not price) / bundle counter / ignore-and-monitor. Zipper fix timeline needs engineering input.", tone: "neutral" },
        { title: "③ WATCH", body: "Short regional trip content outperforming long-haul angles. Duty-estimator experiment mid-flight, read-out Thursday.", tone: "positive" },
        { title: "④ OPEN QUESTIONS", body: "Creator-program impact still unmeasured (tracking pending). Airline sizer-policy rumor UNCONFIRMED — do not act.", tone: "neutral" },
      ],
    },
    reviewChecklist: ["Challenge the priority calls — is #1 really #1 for OUR goals?", "Confirm rumors stayed marked UNCONFIRMED"],
    actions: [{ label: "Assign decisions in Monday standup", description: "Each decision gets an owner and a date." }],
    loopTip: "Mon brief + Tue competitor + Wed content + Thu campaign + Fri performance = the full routine.",
  },

  {
    id: "marketing-routine",
    emoji: "⚙️",
    title: "Marketing Routine",
    category: "Operate",
    summary: "Assemble everything into a weekly operating system: prompts + skills + connectors + loops.",
    steps: [
      { title: "Business Question", question: "What do we want to learn?", answer: "How to run all five weekday workflows as one sustainable system." },
      { title: "Information", question: "What information do we need?", answer: "The five daily templates, their data sources, and owner assignments." },
      { title: "Connector", question: "What authorized source can provide it?", answer: "Each day's own connectors, bundled per the weekly collection checklist." },
      { title: "Skill", question: "What method should Claude follow?", answer: "Routine Design Skill: assign skills to slots → define handoffs → set escalation rules → build the weekly cadence." },
      { title: "Prompt", question: "What should we tell Claude?", answer: "Reusable per-day prompts, stored once, run weekly." },
      { title: "Run", question: "Systematize", answer: "The routine assembles: five days, one rhythm." },
      { title: "Output", question: "What did Claude assemble?", answer: "The weekly routine calendar with building-block composition.", },
      { title: "Review", question: "What should the marketer verify?", answer: "Weekly: is the routine producing decisions or just documents? Prune ruthlessly." },
      { title: "Action", question: "What can we do next?", answer: "Run week one; adjust slots based on friction." },
      { title: "Loop", question: "How can this become recurring intelligence?", answer: "The routine IS the loop, institutionalized. Consistency compounds." },
    ],
    prompt: `Design a weekly AI-assisted marketing routine for a 3-person team using the five daily workflows (customer intel, competitor intel, content planning, campaign review, performance analysis).

CONSTRAINTS
- Each slot ≤90 minutes including human review.
- Every slot ends with a DECISION or a ROUTED ITEM, never just a document.
- Define handoffs: what Tuesday's output feeds.
- Include a monthly prune question: which slot earned its place?

OUTPUT: Weekly cadence table (day, focus, blocks used, output, handoff), Escalation Rules, Monthly Prune Checklist.`,
    output: {
      kind: "calendar",
      entries: [
        { day: "Monday", focus: "Customer intelligence", blocks: ["Prompt", "Skill", "Connector"] },
        { day: "Tuesday", focus: "Competitor intelligence", blocks: ["Prompt", "Skill", "Connector"] },
        { day: "Wednesday", focus: "Content planning", blocks: ["Skill", "Loop"] },
        { day: "Thursday", focus: "Campaign review", blocks: ["Prompt", "Skill", "Human Review"] },
        { day: "Friday", focus: "Performance analysis", blocks: ["Skill", "Loop", "Routine"] },
      ],
    },
    reviewChecklist: ["Did each slot change a decision this week?", "Is any slot producing reading, not action?"],
    actions: [{ label: "Start week one", description: "Run the cadence; log friction daily." }],
    loopTip: "Prune monthly. A routine that never changes is probably ignoring its own data.",
  },

  // ─── Remaining grid entries mapped to rich flows already defined ───────────
];

// Grid-only aliases reuse full flows above (kept for the exact 23-card grid):
export const GRID_ORDER = [
  "customer-research",
  "review-analysis",
  "competitor-analysis",
  "competitor-comparison",
  "competitor-campaigns",
  "market-trends",
  "product-opportunity",
  "feature-opportunity",
  "positioning",
  "launch-timing",
  "campaign-planning",
  "copywriting",
  "ad-creation",
  "social-media",
  "website-content",
  "email-marketing",
  "campaign-analysis",
  "cost-analysis",
  "sales-insights",
  "ab-testing",
  "optimization",
  "weekly-intelligence",
  "marketing-routine",
];
