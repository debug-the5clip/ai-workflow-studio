import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { UseCaseOutput } from "@/lib/lab-types";

function SampleBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
      <AlertTriangle className="h-3 w-3" /> SAMPLE DATA — FOR DEMONSTRATION ONLY
    </span>
  );
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06 },
});

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-[#6B9E8A]" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-[#E5534B]" />;
  return <Minus className="h-3.5 w-3.5 text-[#6B6B66]" />;
}

// ── Theme Clusters (Customer Research, Review Analysis) ─────────────────────────

function ThemeClusters({ data }: { data: Extract<UseCaseOutput, { kind: "themeClusters" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      {data.sentiment && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Positive", value: data.sentiment.positive, color: "bg-[#6B9E8A]/10 text-[#6B9E8A] border-[#6B9E8A]/20" },
            { label: "Negative", value: data.sentiment.negative, color: "bg-[#E5534B]/10 text-[#E5534B] border-[#E5534B]/20" },
            { label: "Mixed", value: data.sentiment.mixed, color: "bg-[#F2C88F]/10 text-[#D97757] border-[#F2C88F]/30" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border px-3 py-2 text-center ${s.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Customer themes</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {data.themes.map((theme, i) => (
          <motion.div
            key={theme.title}
            {...fade(i)}
            className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold text-[#1C1C1C]">{theme.title}</p>
              <span className="shrink-0 rounded-full bg-[#D97757]/10 px-2 py-0.5 text-[10px] font-bold text-[#D97757]">
                {theme.count} mentions
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6B6B66]">{theme.description}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                theme.confidence === "high" ? "bg-[#6B9E8A]/10 text-[#6B9E8A]" :
                theme.confidence === "medium" ? "bg-[#F2C88F]/15 text-[#D97757]" :
                "bg-[#E8E6E1] text-[#6B6B66]"
              }`}>
                {theme.confidence} confidence
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Comparison Matrix (Competitor Analysis, Product Comparison) ─────────────────

function ComparisonMatrix({ data }: { data: Extract<UseCaseOutput, { kind: "comparisonMatrix" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="overflow-x-auto rounded-2xl border border-[#E8E6E1] bg-white">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E6E1]">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Feature</th>
              {data.competitors.map((c) => (
                <th key={c.name} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#D97757]">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#F2F1EE]">
              <td className="px-4 py-2.5 font-semibold text-[#1C1C1C]">Price</td>
              {data.competitors.map((c) => (
                <td key={c.name} className="px-4 py-2.5 text-[#6B6B66]">{c.price}</td>
              ))}
            </tr>
            {data.competitors[0]?.features.map((_, fi) => (
              <tr key={fi} className="border-b border-[#F2F1EE] last:border-0">
                <td className="px-4 py-2.5 font-semibold text-[#1C1C1C]">Feature {fi + 1}</td>
                {data.competitors.map((c) => (
                  <td key={c.name} className="px-4 py-2.5 text-xs text-[#6B6B66]">{c.features[fi] || "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.summary && (
        <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Key takeaway</p>
          <p className="mt-1 text-sm leading-relaxed text-[#1C1C1C]">{data.summary}</p>
        </div>
      )}
    </div>
  );
}

// ── Opportunity Card (Product Opportunity) ──────────────────────────────────────

function OpportunityCard({ data }: { data: Extract<UseCaseOutput, { kind: "opportunityCard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Opportunity</p>
        <p className="mt-2 text-lg font-bold text-[#1C1C1C]">{data.opportunity}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Customer Need", value: data.customerNeed, color: "border-[#D97757]/20" },
          { label: "Competitive Context", value: data.competitiveContext, color: "border-[#7B8EC9]/20" },
          { label: "Potential Benefit", value: data.potentialBenefit, color: "border-[#6B9E8A]/20" },
          { label: "Next Investigation", value: data.nextInvestigation, color: "border-[#F2C88F]/30" },
        ].map((f) => (
          <div key={f.label} className={`rounded-xl border bg-white p-3 ${f.color}`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">{f.label}</p>
            <p className="mt-1 text-sm text-[#1C1C1C]">{f.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#E8E6E1] bg-white p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Risks</p>
        <ul className="mt-1.5 space-y-1">
          {data.risks.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-[#6B6B66]">
              <span className="mt-0.5 text-[#E5534B]">•</span> {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Questions to validate</p>
        <ul className="mt-1.5 space-y-1">
          {data.questions.map((q) => (
            <li key={q} className="flex items-start gap-2 text-xs text-[#6B6B66]">
              <span className="mt-0.5 text-[#D97757]">?</span> {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Campaign Canvas ─────────────────────────────────────────────────────────────

function CampaignCanvas({ data }: { data: Extract<UseCaseOutput, { kind: "campaignCanvas" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Campaign Insight</p>
        <p className="mt-2 text-lg font-bold text-[#1C1C1C]">{data.insight}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Key Message</p>
          <p className="mt-1 text-sm font-semibold text-[#1C1C1C]">{data.message}</p>
        </div>
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Audience</p>
          <p className="mt-1 text-sm text-[#1C1C1C]">{data.audience}</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Channels</p>
        <div className="flex flex-wrap gap-2">
          {data.channels.map((ch) => (
            <span key={ch} className="rounded-full bg-[#D97757]/10 px-3 py-1 text-xs font-semibold text-[#D97757]">{ch}</span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B9E8A]">Call to Action</p>
        <p className="mt-1 text-sm font-semibold text-[#1C1C1C]">{data.cta}</p>
      </div>
      {data.metrics.length > 0 && (
        <div className="rounded-xl border border-[#E8E6E1] bg-white p-4">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Success Metrics</p>
          <div className="flex flex-wrap gap-1.5">
            {data.metrics.map((m) => (
              <span key={m} className="rounded-full border border-[#E8E6E1] bg-[#FAFAF8] px-2.5 py-0.5 text-[10px] font-medium text-[#6B6B66]">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Ad Preview ──────────────────────────────────────────────────────────────────

function AdPreview({ data }: { data: Extract<UseCaseOutput, { kind: "adPreview" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Ad variations</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.variations.map((v, i) => (
          <motion.div key={i} {...fade(i)} className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm">
            <span className="mb-2 inline-flex rounded-full bg-[#D97757]/10 px-2 py-0.5 text-[10px] font-bold text-[#D97757]">
              Variation {i + 1}
            </span>
            <p className="mt-1 text-sm font-bold text-[#1C1C1C]">{v.headline}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6B6B66]">{v.body}</p>
            <div className="mt-3 rounded-lg bg-[#D97757] px-3 py-1.5 text-center text-xs font-bold text-white">{v.cta}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Social Preview ──────────────────────────────────────────────────────────────

function SocialPreview({ data }: { data: Extract<UseCaseOutput, { kind: "socialPreview" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Social content concepts</p>
      {data.posts.map((post, i) => (
        <motion.div key={i} {...fade(i)} className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-[#D97757]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#D97757] uppercase tracking-wider">{post.platform}</span>
            {post.visualDirection && (
              <span className="text-[10px] text-[#6B6B66]">Visual: {post.visualDirection}</span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-[#1C1C1C]">{post.caption}</p>
          {post.hashtags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.hashtags.map((h) => (
                <span key={h} className="text-[11px] text-[#7B8EC9]">{h}</span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── Email Preview ───────────────────────────────────────────────────────────────

function EmailPreview({ data }: { data: Extract<UseCaseOutput, { kind: "emailPreview" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#E8E6E1] bg-white p-5 shadow-sm">
        <div className="space-y-2 border-b border-[#E8E6E1] pb-3 mb-3">
          <p className="text-xs text-[#6B6B66]">Subject: <span className="font-semibold text-[#1C1C1C]">{data.subject}</span></p>
          <p className="text-xs text-[#6B6B66]">Preheader: <span className="text-[#6B6B66]">{data.preheader}</span></p>
        </div>
        <div className="text-sm leading-relaxed text-[#1C1C1C] whitespace-pre-line">{data.body}</div>
        <div className="mt-4 rounded-lg bg-[#D97757] px-4 py-2.5 text-center text-sm font-bold text-white">{data.cta}</div>
      </div>
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Why this works</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {Object.entries(data.reasoning).map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white border border-[#E8E6E1] px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">{k}</p>
              <p className="mt-0.5 text-xs text-[#1C1C1C]">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Analytics Dashboard ─────────────────────────────────────────────────────────

function Dashboard({ data }: { data: Extract<UseCaseOutput, { kind: "dashboard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {data.metrics.map((m, i) => (
          <motion.div key={m.name} {...fade(i)} className="rounded-xl border border-[#E8E6E1] bg-white p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">{m.name}</p>
            <p className="mt-1 text-xl font-bold text-[#1C1C1C]">{m.value}</p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <TrendIcon trend={m.trend} />
              <span className={`text-[10px] font-semibold ${m.trend === "up" ? "text-[#6B9E8A]" : m.trend === "down" ? "text-[#E5534B]" : "text-[#6B6B66]"}`}>
                {m.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">What worked</p>
          <ul className="mt-1.5 space-y-1">
            {data.whatWorked.map((w) => (
              <li key={w} className="text-xs text-[#1C1C1C]">✓ {w}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#E5534B]/20 bg-[#E5534B]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E5534B]">What didn't</p>
          <ul className="mt-1.5 space-y-1">
            {data.whatDidNot.map((w) => (
              <li key={w} className="text-xs text-[#1C1C1C]">✗ {w}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Test next</p>
          <p className="mt-1 text-xs text-[#1C1C1C]">{data.nextTest}</p>
        </div>
      </div>
    </div>
  );
}

// ── A/B Comparison ──────────────────────────────────────────────────────────────

function AbComparison({ data }: { data: Extract<UseCaseOutput, { kind: "abComparison" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="grid gap-3 sm:grid-cols-2">
        {[data.variantA, data.variantB].map((v, i) => (
          <div key={i} className={`rounded-2xl border p-4 ${i === 1 ? "border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04]" : "border-[#E8E6E1] bg-white"}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6B6B66]">{v.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#1C1C1C]">{v.result}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Hypothesis</p>
        <p className="mt-1 text-sm text-[#1C1C1C]">{data.hypothesis}</p>
      </div>
      <div className="rounded-2xl border border-[#E8E6E1] bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B6B66]">Suggested next test</p>
        <p className="mt-1 text-sm text-[#1C1C1C]">{data.nextTest}</p>
      </div>
    </div>
  );
}

// ── Diagnosis Card (Campaign Optimization) ─────────────────────────────────────

function DiagnosisCard({ data }: { data: Extract<UseCaseOutput, { kind: "diagnosisCard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#E8E6E1] bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Diagnosis</p>
        <p className="mt-2 text-lg font-bold text-[#1C1C1C]">{data.diagnosis}</p>
        <div className="mt-2 inline-flex rounded-full bg-[#F2C88F]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#D97757]">
          Confidence: {data.confidence}
        </div>
      </div>
      <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Proposed experiment</p>
        <p className="mt-1 text-sm font-semibold text-[#1C1C1C]">{data.experiment}</p>
        <p className="mt-1 text-xs text-[#6B6B66]">Expected impact: {data.expectedImpact}</p>
      </div>
      <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Measurement plan</p>
        <p className="mt-0.5 text-xs text-[#1C1C1C]">{data.measurementPlan}</p>
      </div>
    </div>
  );
}

// ── Feature Scorecard ──────────────────────────────────────────────────────────

function FeatureScorecard({ data }: { data: Extract<UseCaseOutput, { kind: "featureScorecard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-5">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold text-[#1C1C1C]">{data.feature}</p>
          <span className="rounded-full bg-[#D97757]/10 px-2.5 py-0.5 text-xs font-bold text-[#D97757]">{data.mentionCount} mentions</span>
        </div>
        <p className="mt-1 text-xs text-[#6B6B66]">Competitor presence: {data.competitorPresence}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">For building this</p>
          <ul className="mt-1.5 space-y-1">
            {data.forPoints.map((p) => (
              <li key={p} className="text-xs text-[#1C1C1C]">✓ {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[#E5534B]/20 bg-[#E5534B]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E5534B]">Against building this</p>
          <ul className="mt-1.5 space-y-1">
            {data.againstPoints.map((p) => (
              <li key={p} className="text-xs text-[#1C1C1C]">✗ {p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Positioning Cards ──────────────────────────────────────────────────────────

function PositioningCards({ data }: { data: Extract<UseCaseOutput, { kind: "positioningCards" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      {data.angles.map((a, i) => (
        <motion.div key={i} {...fade(i)} className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Angle {i + 1}</p>
          <p className="mt-1 text-base font-bold text-[#1C1C1C]">{a.angle}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Evidence</p>
              <p className="mt-0.5 text-xs text-[#1C1C1C]">{a.evidence}</p>
            </div>
            <div className="rounded-lg bg-[#FAFAF8] border border-[#E8E6E1] px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Differentiation</p>
              <p className="mt-0.5 text-xs text-[#1C1C1C]">{a.differentiation}</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-[#E5534B]">Risk: {a.risks}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Evidence Split (Market Trends) ─────────────────────────────────────────────

function EvidenceSplit({ data }: { data: Extract<UseCaseOutput, { kind: "evidenceSplit" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Supporting evidence</p>
          <ul className="mt-2 space-y-1.5">
            {data.supporting.map((s) => (
              <li key={s} className="flex items-start gap-2 text-xs text-[#1C1C1C]">
                <span className="mt-0.5 text-[#6B9E8A]">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#E5534B]/20 bg-[#E5534B]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E5534B]">Conflicting evidence</p>
          <ul className="mt-2 space-y-1.5">
            {data.conflicting.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-[#1C1C1C]">
                <span className="mt-0.5 text-[#E5534B]">✗</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Confidence read</p>
        <p className="mt-1 text-lg font-bold text-[#1C1C1C]">{data.confidenceRead}</p>
      </div>
    </div>
  );
}

// ── Messaging Breakdown (Competitor Campaign) ──────────────────────────────────

function MessagingBreakdown({ data }: { data: Extract<UseCaseOutput, { kind: "messagingBreakdown" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#E8E6E1] bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6B6B66]">Competitor</p>
        <p className="mt-1 text-lg font-bold text-[#1C1C1C]">{data.competitor}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { label: "Messaging", value: data.messaging },
          { label: "Target Audience", value: data.audience },
          { label: "Positioning", value: data.positioning },
          { label: "What's New", value: data.whatsNew },
        ].map((f) => (
          <div key={f.label} className="rounded-xl border border-[#E8E6E1] bg-white p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">{f.label}</p>
            <p className="mt-0.5 text-xs text-[#1C1C1C]">{f.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-[#F2C88F]/30 bg-[#F2C88F]/[0.06] p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#D97757]">Inference (not confirmed)</p>
        <p className="mt-0.5 text-xs text-[#6B6B66]">{data.inference}</p>
      </div>
    </div>
  );
}

// ── Launch Timeline ─────────────────────────────────────────────────────────────

function LaunchTimeline({ data }: { data: Extract<UseCaseOutput, { kind: "launchTimeline" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Recommended window</p>
        <p className="mt-1 text-xl font-bold text-[#1C1C1C]">{data.recommendedWindow}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#6B9E8A]/20 bg-[#6B9E8A]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Reasons</p>
          <ul className="mt-1.5 space-y-1">{data.reasons.map((r) => <li key={r} className="text-xs text-[#1C1C1C]">✓ {r}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-[#E5534B]/20 bg-[#E5534B]/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E5534B]">Risks</p>
          <ul className="mt-1.5 space-y-1">{data.risks.map((r) => <li key={r} className="text-xs text-[#1C1C1C]">⚠ {r}</li>)}</ul>
        </div>
      </div>
      <div className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Open questions</p>
        <ul className="mt-1 space-y-0.5">{data.openQuestions.map((q) => <li key={q} className="text-xs text-[#6B6B66]">? {q}</li>)}</ul>
      </div>
    </div>
  );
}

// ── Cost Efficiency ─────────────────────────────────────────────────────────────

function CostEfficiency({ data }: { data: Extract<UseCaseOutput, { kind: "costEfficiency" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="overflow-x-auto rounded-2xl border border-[#E8E6E1] bg-white">
        <table className="w-full min-w-[450px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E6E1]">
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Channel</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Spend</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Efficiency</th>
              <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Investigate</th>
            </tr>
          </thead>
          <tbody>
            {data.rankings.map((r) => (
              <tr key={r.channel} className="border-b border-[#F2F1EE] last:border-0">
                <td className="px-4 py-2.5 font-semibold text-[#1C1C1C]">{r.channel}</td>
                <td className="px-4 py-2.5 text-[#6B6B66]">{r.spend}</td>
                <td className="px-4 py-2.5 font-semibold text-[#1C1C1C]">{r.efficiency}</td>
                <td className="px-4 py-2.5 text-xs text-[#6B6B66]">{r.investigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Sales Timeline ──────────────────────────────────────────────────────────────

function SalesTimeline({ data }: { data: Extract<UseCaseOutput, { kind: "salesTimeline" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      {data.associations.map((a, i) => (
        <motion.div key={i} {...fade(i)} className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm">
          <p className="text-sm font-bold text-[#1C1C1C]">{a.campaign}</p>
          <p className="mt-1 text-xs text-[#6B6B66]">Correlation: {a.correlation}</p>
          <span className="mt-1 inline-flex rounded-full bg-[#F2C88F]/15 px-2 py-0.5 text-[10px] font-bold text-[#D97757]">Confidence: {a.confidence}</span>
          <p className="mt-1 text-[10px] text-[#6B6B66] italic">{a.caveat}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Weekly Digest ──────────────────────────────────────────────────────────────

function WeeklyDigest({ data }: { data: Extract<UseCaseOutput, { kind: "weeklyDigest" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      {data.sections.map((s, i) => (
        <motion.div key={i} {...fade(i)} className="rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">{s.area}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">What's new</p>
              <ul className="mt-1 space-y-0.5">{s.whatsNew.map((n) => <li key={n} className="text-xs text-[#1C1C1C]">• {n}</li>)}</ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Watch</p>
              <ul className="mt-1 space-y-0.5">{s.whatToWatch.map((w) => <li key={w} className="text-xs text-[#1C1C1C]">👁 {w}</li>)}</ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B9E8A]">Action</p>
              <p className="mt-1 text-xs font-semibold text-[#1C1C1C]">{s.recommendedAction}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Routine Calendar ───────────────────────────────────────────────────────────

function RoutineCalendar({ data }: { data: Extract<UseCaseOutput, { kind: "routineCalendar" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Your weekly marketing routine</p>
        <p className="mt-1 text-xs text-[#6B6B66]">Educational framing — this is a playbook your team follows, not software that runs itself.</p>
      </div>
      <div className="grid gap-2">
        {data.days.map((d, i) => (
          <motion.div key={i} {...fade(i)} className="flex items-center gap-3 rounded-xl border border-[#E8E6E1] bg-white p-3">
            <span className="w-20 shrink-0 rounded-lg bg-[#D97757]/10 px-2.5 py-1 text-center text-xs font-bold text-[#D97757]">{d.day}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1C1C1C]">{d.task}</p>
              <p className="text-[10px] text-[#6B6B66]">Skill: {d.skill} · Connector: {d.connector}</p>
            </div>
            <span className="text-[10px] text-[#6B6B66]">Owner: {d.owner}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Output Router ──────────────────────────────────────────────────────────────

export function OutputRenderer({ output }: { output: UseCaseOutput }) {
  if (!output) {
    return (
      <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-8 text-center">
        <p className="text-sm text-[#6B6B66]">Output will appear here after running the analysis.</p>
      </div>
    );
  }

  switch (output.kind) {
    case "themeClusters": return <ThemeClusters data={output} />;
    case "comparisonMatrix": return <ComparisonMatrix data={output} />;
    case "opportunityCard": return <OpportunityCard data={output} />;
    case "campaignCanvas": return <CampaignCanvas data={output} />;
    case "adPreview": return <AdPreview data={output} />;
    case "socialPreview": return <SocialPreview data={output} />;
    case "emailPreview": return <EmailPreview data={output} />;
    case "dashboard": return <Dashboard data={output} />;
    case "abComparison": return <AbComparison data={output} />;
    case "diagnosisCard": return <DiagnosisCard data={output} />;
    case "featureScorecard": return <FeatureScorecard data={output} />;
    case "positioningCards": return <PositioningCards data={output} />;
    case "evidenceSplit": return <EvidenceSplit data={output} />;
    case "messagingBreakdown": return <MessagingBreakdown data={output} />;
    case "launchTimeline": return <LaunchTimeline data={output} />;
    case "costEfficiency": return <CostEfficiency data={output} />;
    case "salesTimeline": return <SalesTimeline data={output} />;
    case "weeklyDigest": return <WeeklyDigest data={output} />;
    case "routineCalendar": return <RoutineCalendar data={output} />;
    default: {
      const _exhaustive: never = output;
      return (
        <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-6 text-center">
          <p className="text-sm text-[#6B6B66]">Visual output type not yet implemented.</p>
        </div>
      );
    }
  }
}
