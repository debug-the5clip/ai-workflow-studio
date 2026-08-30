// ─── Connector Ecosystem Catalogue ────────────────────────────────────────────
/**
 * All connectors are clearly classified:
 *   - "connected-simulated" → works in demo mode, clearly labeled
 *   - "available" → can be integrated in future, shows as recommended
 *   - "not-available" → listed for reference only, clearly labeled
 *
 * Nothing here claims a connector is actually connected unless it is.
 */

import type { ConnectorDetail } from "@/lib/lab-types";

// ─── Categories ──────────────────────────────────────────────────────────────

export const CONNECTOR_CATEGORIES = [
  {
    id: "research",
    label: "Research & External Intelligence",
    icon: "🔎",
    connectors: [
      { name: "Web / Public Research", icon: "🌐", whatItProvides: "Publicly available competitor pages, news, market reports, search results", whyUse: "External market intelligence that requires no internal access", status: "connected-simulated" as const, category: "research" },
      { name: "Public Reviews", icon: "⭐", whatItProvides: "Customer reviews from public platforms (Amazon, Google, Trustpilot)", whyUse: "Customer sentiment and pain-point signals from real buyers", status: "connected-simulated" as const, category: "research" },
      { name: "News / Market Information", icon: "📰", whatItProvides: "Industry news, market reports, analyst commentary", whyUse: "Market context and trend validation", status: "available" as const, category: "research" },
      { name: "Public Social Content", icon: "📱", whatItProvides: "Public posts, comments, and discussions on social platforms", whyUse: "Customer voice and trend signals from organic social conversations", status: "available" as const, category: "research" },
    ],
  },
  {
    id: "documents",
    label: "Documents & Knowledge",
    icon: "📄",
    connectors: [
      { name: "Google Drive", icon: "📁", whatItProvides: "Access to documents, spreadsheets, PDFs, presentations", whyUse: "Internal research reports, brand guidelines, product specs, competitor analyses", status: "connected-simulated" as const, category: "documents" },
      { name: "OneDrive / SharePoint", icon: "📁", whatItProvides: "Microsoft Office documents and shared team files", whyUse: "Enterprise document access for teams using Microsoft 365", status: "available" as const, category: "documents" },
      { name: "Notion", icon: "📝", whatItProvides: "Knowledge base, wiki pages, project documentation, meeting notes", whyUse: "Brand guidelines, strategy docs, content calendars, team knowledge", status: "connected-simulated" as const, category: "documents" },
      { name: "Dropbox", icon: "📦", whatItProvides: "Cloud-stored files and folders", whyUse: "Asset libraries, archived documents, shared team resources", status: "available" as const, category: "documents" },
    ],
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "📊",
    connectors: [
      { name: "Google Sheets", icon: "📊", whatItProvides: "Structured data in spreadsheet format — sales, campaign metrics, review exports", whyUse: "Quantitative analysis of marketing performance, customer data, or sales figures", status: "connected-simulated" as const, category: "data" },
      { name: "Excel / CSV", icon: "📊", whatItProvides: "Local structured data files for analysis", whyUse: "Quick analysis of exported reports without cloud storage", status: "connected-simulated" as const, category: "data" },
      { name: "Analytics Platforms", icon: "📈", whatItProvides: "Website and marketing performance data (Google Analytics, Mixpanel)", whyUse: "Funnel analysis, traffic patterns, conversion tracking", status: "available" as const, category: "data" },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: "💬",
    connectors: [
      { name: "Gmail", icon: "✉️", whatItProvides: "Read and draft emails", whyUse: "Draft campaign emails, analyze customer feedback from email, follow up on insights", status: "connected-simulated" as const, category: "communication" },
      { name: "Outlook", icon: "✉️", whatItProvides: "Read and draft emails, calendar access", whyUse: "Enterprise email and scheduling for Microsoft-centric teams", status: "available" as const, category: "communication" },
      { name: "Slack", icon: "💬", whatItProvides: "Team channel messages and threads", whyUse: "Understand team discussions, surface decisions, share analysis results", status: "available" as const, category: "communication" },
      { name: "Microsoft Teams", icon: "💬", whatItProvides: "Team messages and meeting notes", whyUse: "Team collaboration context for enterprise environments", status: "available" as const, category: "communication" },
    ],
  },
  {
    id: "creative",
    label: "Creative & Content",
    icon: "🎨",
    connectors: [
      { name: "Canva", icon: "🎨", whatItProvides: "Design templates and marketing assets", whyUse: "Create visual campaign assets based on AI-generated content briefs", status: "available" as const, category: "creative" },
      { name: "Google Docs", icon: "📝", whatItProvides: "Document editing and collaboration", whyUse: "Draft and collaborate on campaign briefs, blog posts, reports", status: "connected-simulated" as const, category: "creative" },
      { name: "Presentation Tools", icon: "📊", whatItProvides: "Slide deck creation and editing", whyUse: "Turn analysis into stakeholder presentations", status: "available" as const, category: "creative" },
    ],
  },
  {
    id: "project",
    label: "Project Management",
    icon: "✅",
    connectors: [
      { name: "Asana", icon: "✅", whatItProvides: "Task lists, project boards, workflow tracking", whyUse: "Create action items from insights, track campaign tasks, manage workflows", status: "connected-simulated" as const, category: "project" },
      { name: "Jira", icon: "✅", whatItProvides: "Issue tracking and sprint management", whyUse: "Technical project coordination for product/marketing tech teams", status: "available" as const, category: "project" },
      { name: "Trello", icon: "📋", whatItProvides: "Visual boards and card-based task management", whyUse: "Simple workflow tracking for small teams", status: "available" as const, category: "project" },
      { name: "Monday.com", icon: "📋", whatItProvides: "Work OS with custom workflows", whyUse: "Structured project management for marketing operations", status: "available" as const, category: "project" },
    ],
  },
  {
    id: "crm",
    label: "CRM & Customer Data",
    icon: "👥",
    connectors: [
      { name: "Salesforce", icon: "👥", whatItProvides: "Customer relationship data, deal pipeline, support cases", whyUse: "Understand customer lifecycle, sales patterns, support themes", status: "available" as const, category: "crm" },
      { name: "HubSpot", icon: "👥", whatItProvides: "Marketing automation data, contact records, campaign history", whyUse: "Marketing-sales alignment, campaign attribution, customer journey analysis", status: "available" as const, category: "crm" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing & Campaign Platforms",
    icon: "📣",
    connectors: [
      { name: "Google Ads", icon: "📣", whatItProvides: "Ad campaign performance, spend data, audience metrics", whyUse: "Campaign analysis, cost-efficiency review, A/B test results", status: "available" as const, category: "marketing" },
      { name: "Meta Ads Manager", icon: "📣", whatItProvides: "Facebook/Instagram campaign data and audience insights", whyUse: "Social campaign performance and audience analysis", status: "available" as const, category: "marketing" },
      { name: "Email Marketing Platforms", icon: "📧", whatItProvides: "Email campaign metrics — open rates, clicks, conversions", whyUse: "Email performance analysis and optimization recommendations", status: "available" as const, category: "marketing" },
      { name: "Social Media Management", icon: "📱", whatItProvides: "Social post scheduling, engagement metrics, audience growth", whyUse: "Content performance analysis and social strategy optimization", status: "available" as const, category: "marketing" },
      { name: "Payment / Commerce", icon: "💳", whatItProvides: "Transaction data, revenue by product/campaign", whyUse: "Connect marketing efforts to actual sales outcomes", status: "available" as const, category: "marketing" },
    ],
  },
];

// ─── Helper: get all connectors flat ─────────────────────────────────────────

export function getAllConnectors(): ConnectorDetail[] {
  return CONNECTOR_CATEGORIES.flatMap((cat) =>
    cat.connectors.map((c) => ({
      name: c.name,
      icon: c.icon,
      status: c.status as ConnectorDetail["status"],
      whatItProvides: c.whatItProvides,
      whyRecommended: c.whyUse,
      category: cat.label,
    }))
  );
}

// ─── Helper: get connectors for a specific need ──────────────────────────────

export function getRecommendedConnectors(
  needs: string[]
): ConnectorDetail[] {
  const all = getAllConnectors();
  return all.filter((c) => {
    const matchText = `${c.name} ${c.whatItProvides} ${c.whyRecommended}`.toLowerCase();
    return needs.some((n) => matchText.includes(n.toLowerCase()));
  });
}

// ─── Workflow-level connector recommendations ────────────────────────────────
// Maps workflow types to their recommended connectors with reasons

export const WORKFLOW_CONNECTOR_MAP: Record<string, { connectors: string[]; reasons: Record<string, string> }> = {
  "competitor-campaign-analysis": {
    connectors: ["Web / Public Research", "Public Reviews", "Google Drive"],
    reasons: {
      "Web / Public Research": "Public competitor campaign information is required for external market intelligence.",
      "Public Reviews": "Customer reactions to the competitor's campaign provide real sentiment signals.",
      "Google Drive": "Internal strategy documents provide context for comparison.",
    },
  },
  "customer-complaint-analysis": {
    connectors: ["Google Sheets", "Notion", "Web / Public Research"],
    reasons: {
      "Google Sheets": "Structured review and complaint data requires spreadsheet analysis.",
      "Notion": "Internal product documentation provides context for categorizing complaints.",
      "Web / Public Research": "Public reviews supplement internal data with broader customer voice.",
    },
  },
  "product-launch-planning": {
    connectors: ["Google Drive", "Google Sheets", "Notion", "Web / Public Research"],
    reasons: {
      "Google Drive": "Product specs, launch materials, and planning documents.",
      "Google Sheets": "Sales forecasts, inventory data, and campaign history.",
      "Notion": "Strategy documentation, brand guidelines, and launch checklists.",
      "Web / Public Research": "Market conditions, competitor activity, and trend signals.",
    },
  },
  "sales-decline-investigation": {
    connectors: ["Google Sheets", "Google Drive"],
    reasons: {
      "Google Sheets": "Structured sales data is required to identify declining products and patterns.",
      "Google Drive": "Internal reports provide context for understanding business factors.",
    },
  },
  "campaign-performance-optimization": {
    connectors: ["Google Sheets", "Google Drive", "Web / Public Research"],
    reasons: {
      "Google Sheets": "Campaign performance metrics need structured analysis.",
      "Google Drive": "Campaign briefs and strategy documents provide baseline context.",
      "Web / Public Research": "Industry benchmarks help contextualize performance.",
    },
  },
};
