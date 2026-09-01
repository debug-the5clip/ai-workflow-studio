export { COMPANY_CONTEXT } from "./uc1";
export * from "./sources";
import { UC_1_8 } from "./uc1";
import { UC_9_16 } from "./uc2";
import { UC_17_24 } from "./uc3";
import { UC_25_27 } from "./uc4";
import type { UseCase, DemoResult } from "@/lib/lab-types";

// ── Demo Results for flagship use cases ────────────────────────────────────────
// These provide polished illustrative output when live Claude generation is
// unavailable. All content is clearly labeled as DEMO MODE in the UI.

const DEMO_RESULTS: Record<string, DemoResult> = {
  "campaign-analysis-competitor": {
    executiveSummary: "The competitor's new campaign positions luggage around effortless travel rather than product specs. Messaging emphasizes lightweight design, smart organization, and stress-free journeys. Customer reactions show strong interest in the convenience narrative. This creates an opportunity for Voyara to test a counter-positioning around durability-meets-convenience.",
    findings: [
      {
        finding: "Campaign message centers on travel experience, not product specs",
        evidence: "Competitor taglines reference 'travel lighter' and 'move easier' with no technical specifications in primary messaging.",
        interpretation: "The competitor is shifting from feature-based to emotion-based positioning, targeting the travel experience rather than the luggage itself.",
        confidence: "high"
      },
      {
        finding: "Target audience appears to be frequent travelers aged 28-45",
        evidence: "Social media ads and influencer partnerships consistently show business travelers and frequent leisure travelers in this demographic.",
        interpretation: "The campaign targets the high-frequency traveler segment where purchase frequency and brand loyalty are highest.",
        confidence: "medium"
      },
      {
        finding: "Customer reactions show strong engagement with the convenience narrative",
        evidence: "Public comments on social posts emphasize lightweight, easy to carry, and organized packing as top reasons for interest.",
        interpretation: "Convenience messaging resonates, matching themes Voyara's own research shows as high-priority customer needs.",
        confidence: "high"
      },
      {
        finding: "Competitor uses a limited-time offer to drive urgency",
        evidence: "Campaign includes a launch-week 15% discount visible across multiple channels.",
        interpretation: "The promotional discount suggests the competitor is prioritizing volume over margin in this launch window.",
        confidence: "medium"
      }
    ],
    businessInsight: "The competitor is betting on an emotional travel-experience narrative. While resonating, it leaves open an opportunity: a brand that combines both the emotional travel story AND the practical product proof. Voyara could test 'effortless travel, backed by real engineering' as a counter-position.",
    recommendedActions: [
      "Test a campaign with 'Travel lighter. Move easier.' paired with product proof points",
      "Create three creative directions: lightweight travel, smarter organization, and stress-free airport experience",
      "Set up a monthly loop to track competitor messaging evolution"
    ],
    doubleCheck: [
      "Is the competitor discount a permanent change or limited promotion?",
      "Has competitor messaging shifted since this analysis?",
      "Confirm Voyara production capacity before committing to a responsive timeline",
      "Validate with sales whether these themes match actual purchase conversations"
    ]
  },

  "customer-complaint-analysis": {
    executiveSummary: "Analysis of 47 customer complaints about luggage wheels reveals that bearing quality — not wheel size — is the primary driver of negative experiences. While wheel-size complaints are more frequent, bearing failures create significantly higher severity ratings and more public negative reviews.",
    findings: [
      {
        finding: "Bearing quality is the root cause of the most severe wheel complaints",
        evidence: "Complaints mentioning bearing failure have 4.2x higher severity scores than wheel-size complaints. 73% of 1-star reviews reference bearing or swivel issues.",
        interpretation: "The bearing component is the highest-impact fix. Redesigning wheel dimensions without addressing bearings will not resolve the core customer pain.",
        confidence: "high"
      },
      {
        finding: "Wheel-size complaints are more frequent but lower severity",
        evidence: "42% of wheel complaints mention size, but average severity is 2.1/5 versus 4.6/5 for bearing complaints.",
        interpretation: "Size complaints are a convenience issue; bearing complaints are a functionality failure. They require different solutions.",
        confidence: "high"
      },
      {
        finding: "Competitor products use sealed bearings as a differentiator",
        evidence: "Three of five top competitors mention sealed bearings in their product specifications.",
        interpretation: "Voyara may be behind on a component that competitors consider a selling point.",
        confidence: "medium"
      }
    ],
    businessInsight: "The product team should prioritize bearing quality investigation over wheel dimension redesign. Bearing failures drive the most damaging reviews and represent a functional gap versus competitors who already market sealed bearings.",
    recommendedActions: [
      "Create an engineering brief for bearing quality investigation and supplier audit",
      "Run a competitive comparison of wheel bearings across the top 5 competitors",
      "Add bearing quality as a priority item in the next product cycle review"
    ],
    doubleCheck: [
      "Verify that severity ratings are consistent across complaint sources",
      "Confirm bearing specifications in competitor product pages are current",
      "Check whether any recent supplier changes coincided with increased bearing complaints"
    ]
  },

  "product-launch-planning": {
    executiveSummary: "Market signals indicate moderate-to-strong demand for a lightweight luggage line, with customer research showing lightweight as the #1 unmet need. However, competitor activity in the same segment is increasing, and Voyara's supply chain readiness for the lighter materials needs validation before a go decision.",
    findings: [
      {
        finding: "Lightweight design is the #1 unmet customer need",
        evidence: "Customer research identifies 'lighter weight' in 68% of unsatisfied-need responses. Survey data shows 3.8/5 interest in a lighter product line.",
        interpretation: "Strong existing demand supports the launch thesis, but interest must convert to purchase intent at the planned price point.",
        confidence: "high"
      },
      {
        finding: "Two competitors are launching lightweight lines within 6 months",
        evidence: "Industry signals and retail buyer conversations indicate competitor launches planned for Q3 and Q4.",
        interpretation: "First-mover advantage is limited. Voyara needs to differentiate on more than weight alone.",
        confidence: "medium"
      },
      {
        finding: "Supply chain readiness for lighter materials is unconfirmed",
        evidence: "No production validation exists for the new composite material at scale. Lead times for the lighter shell are estimated but not confirmed.",
        interpretation: "Production risk is the highest unknown in the launch plan.",
        confidence: "medium"
      }
    ],
    businessInsight: "The demand signal is real, but the combination of competitive timing pressure and unconfirmed supply chain readiness suggests a cautious approach: validate manufacturing first, then commit to launch timing.",
    recommendedActions: [
      "Commission a manufacturing readiness assessment for the lighter composite material",
      "Run a pre-launch customer validation survey with pricing",
      "Set a conditional launch date contingent on supply chain confirmation"
    ],
    doubleCheck: [
      "Is the lightweight demand signal from actual purchase behavior or survey interest?",
      "Can the new material meet Voyara's durability standards at scale?",
      "Are competitor launch dates confirmed or just industry speculation?"
    ]
  },

  "sales-decline-investigation": {
    executiveSummary: "Sales of the Voyager Pro have declined 18% over the past two quarters. Analysis of available data points to three likely factors: increased competitor pricing pressure, reduced marketing spend in Q2, and seasonal softening. No single factor appears to be the sole cause.",
    findings: [
      {
        finding: "Competitor pricing pressure is the most likely external factor",
        evidence: "Two competitors reduced prices by 12-15% in Q1. Voyara's pricing remained static. Price-sensitive segments may have shifted.",
        interpretation: "The price gap may be driving volume loss in the mid-tier segment, though Voyara's premium positioning may insulate some customers.",
        confidence: "medium"
      },
      {
        finding: "Marketing spend decreased 25% in Q2",
        evidence: "Campaign budget was reallocated to a product launch in a different category. Paid media impressions dropped correspondingly.",
        interpretation: "Reduced visibility likely contributed to the decline, particularly in top-of-funnel awareness.",
        confidence: "high"
      },
      {
        finding: "Seasonal patterns show Q2 is historically softer",
        evidence: "Two-year average shows Q2 sales are typically 8-12% below Q1.",
        interpretation: "Part of the decline may be seasonal rather than competitive. The 18% decline exceeds the seasonal norm by approximately 6-10 percentage points.",
        confidence: "medium"
      }
    ],
    businessInsight: "The decline is likely a combination of competitive pressure, reduced marketing investment, and seasonal patterns. The most actionable lever is marketing spend — restoring campaign visibility while monitoring whether the competitive pricing pressure persists.",
    recommendedActions: [
      "Restore baseline marketing spend for Voyager Pro in Q3 and measure impact",
      "Run a targeted campaign focused on the features that differentiate from lower-priced competitors",
      "Set up a weekly sales monitoring loop during the recovery period"
    ],
    doubleCheck: [
      "Confirm sales data accuracy across all channels",
      "Verify whether the competitor price reductions are permanent or promotional",
      "Check if any distribution or retail partner changes contributed to the decline"
    ]
  },

  "campaign-optimization": {
    executiveSummary: "The current campaign CTR of 1.2% is below the 2.1% benchmark. Analysis suggests the headline creative is not matching audience expectations, and targeting may be too broad. A single-variable test on the headline is the recommended first experiment.",
    findings: [
      {
        finding: "Headline creative appears misaligned with audience expectations",
        evidence: "CTR dropped after the creative refresh. Click patterns suggest the headline does not match what the audience expects from this product category.",
        interpretation: "The headline may be too abstract. More specific, benefit-driven copy may perform better.",
        confidence: "high"
      },
      {
        finding: "Audience targeting is broader than necessary",
        evidence: "Impressions increased but CTR decreased, suggesting diluted audience quality.",
        interpretation: "Broader reach diluted the click rate. Tighter segments would improve efficiency.",
        confidence: "medium"
      },
      {
        finding: "Creative fatigue is not the primary issue",
        evidence: "Creative was refreshed 3 weeks ago. Fatigue typically appears after 6-8 weeks at this volume.",
        interpretation: "The problem is creative quality and alignment, not creative age.",
        confidence: "high"
      }
    ],
    businessInsight: "The CTR decline is most likely a creative-messaging problem, not a targeting or fatigue problem. Testing a more specific, benefit-driven headline should be the first experiment.",
    recommendedActions: [
      "Test a new headline variant focusing on a specific product benefit",
      "Keep all other variables constant for 2 weeks to isolate headline impact",
      "After the test, apply the winning approach to other campaign variants"
    ],
    doubleCheck: [
      "Confirm the CTR benchmark is current and relevant to this campaign type",
      "Check whether external factors coincided with the creative refresh",
      "Verify the measurement setup can attribute CTR changes to the headline test"
    ]
  }
};

// ── Inject demo results into use cases ─────────────────────────────────────────

function enrichWithDemoResults(uc: UseCase): UseCase {
  const demoResult = DEMO_RESULTS[uc.id];
  return demoResult ? { ...uc, demoResult } : uc;
}

export const USE_CASES: UseCase[] = [...UC_1_8, ...UC_9_16, ...UC_17_24, ...UC_25_27].map(enrichWithDemoResults);
