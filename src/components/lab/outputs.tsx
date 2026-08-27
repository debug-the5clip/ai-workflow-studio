// @ts-nocheck — will be rebuilt with new UseCaseOutput types
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeCheck,
  CircleCheck,
  Lightbulb,
  Mail,
  Search,
  ShieldQuestion,
} from "lucide-react";
import type { UseCaseOutput } from "@/lib/lab-types";

function SampleBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
      <AlertTriangle className="h-3 w-3" /> Sample / demo data
    </span>
  );
}

const fade = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06 },
});

// ── Competitor dashboard ─────────────────────────────────────────────────────

function CompetitorDashboard({ data }: { data: Extract<UseCaseOutput, { kind: "competitorDashboard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      {/* Positioning map */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-300">Positioning map</p>
        <div className="relative h-64 w-full rounded-xl border border-white/5 grid-bg sm:h-72">
          <div className="absolute inset-x-0 top-1 text-center text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Premium</div>
          <div className="absolute inset-x-0 bottom-1 text-center text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Budget</div>
          <div className="absolute inset-y-0 left-1 flex items-center text-[9px] font-semibold tracking-widest text-muted-foreground [writing-mode:vertical-lr]">Function-led</div>
          <div className="absolute inset-y-0 right-1 flex items-center justify-center text-[9px] font-semibold tracking-widest text-muted-foreground [writing-mode:vertical-lr]">Emotion-led</div>
          {data.competitors.map((c, i) => (
            <motion.div
              key={c.name}
              {...fade(i)}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${18 + ((i * 23) % 60)}%`,
                top: `${16 + i * 19}%`,
              }}
            >
              <div className="rounded-full border border-white/20 bg-card px-2.5 py-1 text-[11px] font-semibold shadow-lg transition-transform group-hover:scale-110">
                {c.name}
              </div>
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden w-44 -translate-x-1/2 rounded-lg border border-white/15 bg-popover p-2 text-[11px] leading-snug text-popover-foreground shadow-xl group-hover:block">
                <b>{c.positioning}</b> · {c.priceTier} tier
                <br />
                {c.messaging} — signature: {c.signatureFeature}
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="glow-primary absolute left-[62%] top-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300 bg-cyan-400/25 px-3 py-1.5 text-[11px] font-extrabold text-cyan-100 backdrop-blur"
          >
            VOYARA
          </motion.div>
          <div className="absolute right-2 top-8 max-w-[130px] rounded-lg border border-dashed border-cyan-300/40 p-2 text-[10px] leading-snug text-cyan-200/80">
            open space ↖ premium function-led territory
          </div>
        </div>
      </div>

      {/* Feature comparison */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-300">Feature comparison</p>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-4">Competitor</th>
              <th className="pb-2 pr-4">Positioning</th>
              <th className="pb-2 pr-4">Price tier</th>
              <th className="pb-2 pr-4">Signature feature</th>
              <th className="pb-2">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.competitors.map((c) => (
              <tr key={c.name} className="align-top">
                <td className="py-2.5 pr-4 font-semibold">{c.name}</td>
                <td className="py-2.5 pr-4 text-muted-foreground">{c.positioning}</td>
                <td className="py-2.5 pr-4">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    c.priceTier === "Budget" ? "bg-emerald-300/10 text-emerald-200" :
                    c.priceTier === "Mid" ? "bg-sky-300/10 text-sky-200" :
                    "bg-fuchsia-300/10 text-fuchsia-200"}`}>
                    {c.priceTier}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-muted-foreground">{c.signatureFeature}</td>
                <td className="py-2.5 italic text-muted-foreground">{c.messaging}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Strengths (Voyara)", items: data.strengths, icon: BadgeCheck, color: "text-emerald-300", ring: "border-emerald-300/20 bg-emerald-300/[0.04]" },
          { title: "Potential gaps", items: data.gaps, icon: Search, color: "text-amber-300", ring: "border-amber-300/20 bg-amber-300/[0.04]" },
          { title: "Opportunities", items: data.opportunities, icon: Lightbulb, color: "text-cyan-300", ring: "border-cyan-300/20 bg-cyan-300/[0.04]" },
          { title: "Questions to investigate", items: data.investigate, icon: ShieldQuestion, color: "text-violet-300", ring: "border-violet-300/20 bg-violet-300/[0.04]" },
        ].map((block) => (
          <div key={block.title} className={`rounded-2xl border p-4 ${block.ring}`}>
            <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${block.color}`}>
              <block.icon className="h-3.5 w-3.5" /> {block.title}
            </p>
            <ul className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug text-foreground/85">
                  <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${block.color.replace("text-", "bg-")}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Theme clusters ───────────────────────────────────────────────────────────

function Themes({ data }: { data: Extract<UseCaseOutput, { kind: "themes" }> }) {
  const sentimentColor = {
    positive: "bg-emerald-300",
    negative: "bg-rose-300",
    mixed: "bg-amber-300",
  };
  return (
    <div className="space-y-4">
      <SampleBadge />
      <h3 className="text-lg font-bold">{data.headline}</h3>
      <div className="space-y-2.5">
        {data.themes.map((t, i) => (
          <motion.div key={t.theme} {...fade(i)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">{t.theme}</p>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${sentimentColor[t.sentiment]}`} />
                <span className="text-xs capitalize text-muted-foreground">{t.sentiment}</span>
                <span className="ml-2 text-xs font-bold text-cyan-200">{t.share}% of mentions</span>
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${t.share * 3}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
              />
            </div>
            <p className="mt-2 text-xs italic text-muted-foreground">{t.quote}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-300">Pain points</p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
            {data.pains.map((p) => <li key={p}>• {p}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Underlying needs</p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
            {data.needs.map((n) => <li key={n}>• {n}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Opportunity scorecard ────────────────────────────────────────────────────

function Scorecard({ data }: { data: Extract<UseCaseOutput, { kind: "scorecard" }> }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <SampleBadge />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.fields.map((f, i) => (
          <motion.div key={f.label} {...fade(i)} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">{f.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{f.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="glass flex items-center gap-3 rounded-2xl p-4">
        <ShieldQuestion className="h-5 w-5 shrink-0 text-amber-300" />
        <p className="text-sm text-amber-100/90">{data.disclaimer}</p>
      </div>
    </div>
  );
}

// ── Campaign canvas ──────────────────────────────────────────────────────────

function CampaignCanvas({ data }: { data: Extract<UseCaseOutput, { kind: "campaignCanvas" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <motion.div {...fade(0)} className="glow-primary rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 to-fuchsia-400/10 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Campaign concept</p>
        <p className="mx-auto mt-2 max-w-md text-balance text-xl font-extrabold tracking-tight">{data.concept}</p>
      </motion.div>
      <div className="grid gap-3 md:grid-cols-2">
        {data.pieces.map((p, i) => (
          <motion.div key={p.kind + p.title} {...fade(i + 1)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-fuchsia-300/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fuchsia-200">{p.kind}</span>
            </div>
            <p className="mt-2.5 text-sm font-semibold">{p.title}</p>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Copy lab ─────────────────────────────────────────────────────────────────

function CopyLab({ data }: { data: Extract<UseCaseOutput, { kind: "copyLab" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="glass grid gap-3 rounded-2xl p-4 sm:grid-cols-3">
        {[["Platform", data.platform], ["Goal", data.goal], ["Tone", data.tone]].map(([k, v]) => (
          <div key={k}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</p>
            <p className="text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {data.variants.map((v, i) => (
          <motion.div key={v.angle} {...fade(i)}>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
              Variant {String.fromCharCode(65 + i)} · {v.angle}
            </p>
            <div className="rounded-2xl border border-fuchsia-300/20 bg-gradient-to-b from-fuchsia-300/[0.06] to-transparent p-4">
              <div className="mb-2 flex gap-1">
                {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/15" />)}
              </div>
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground/90">{v.copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Email preview ────────────────────────────────────────────────────────────

import { useState } from "react";
import { Eye, FlaskConical } from "lucide-react";

function EmailPreview({ data }: { data: Extract<UseCaseOutput, { kind: "emailPreview" }> }) {
  const [view, setView] = useState<"output" | "prompt" | "why">("output");
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="flex gap-2">
        {(
          [
            ["output", "Output", Eye],
            ["prompt", "Prompt", FlaskConical],
            ["why", "Why this works", CircleCheck],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            aria-pressed={view === key}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
              view === key
                ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200"
                : "border-white/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {view === "output" && (
        <motion.div {...fade(0)} className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.97] text-slate-900 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2.5">
            <Mail className="h-4 w-4 text-slate-500" />
            <span className="text-xs text-slate-500">Voyara · Launch announcement</span>
          </div>
          <div className="p-5">
            <p className="text-base font-bold">{data.subject}</p>
            <p className="mt-0.5 text-sm text-slate-500">{data.preheader}</p>
            <div className="mt-4 whitespace-pre-line rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed">
              {data.body[0]}
            </div>
            <button className="mt-4 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">
              SEE THE FIT DATA →
            </button>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3 text-xs text-slate-500">
              <p><b>Audience:</b> {data.audience}</p>
              <p><b>Objective:</b> {data.objective}</p>
            </div>
          </div>
        </motion.div>
      )}

      {view === "prompt" && (
        <motion.div {...fade(0)} className="glass rounded-2xl p-4">
          <p className="whitespace-pre-line font-mono text-[13px] leading-relaxed text-foreground/85">{EMAIL_PROMPT}</p>
        </motion.div>
      )}

      {view === "why" && (
        <motion.ul {...fade(0)} className="space-y-2.5">
          {data.whyItWorks.map((w) => (
            <li key={w} className="flex items-start gap-2.5 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.04] p-3.5 text-sm">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              {w}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

const EMAIL_PROMPT = `Write a launch-waitlist email for Voyara's Voyager Pro.

SEGMENT: Browsers who viewed the product page ≥2 times in 90 days but didn't buy.
OBJECTIVE: Launch-day conversion (pre-order click).
DELIVERABLES
- 3 subject lines: curiosity / direct / urgency (≤42 chars)
- 1 preheader per subject (≤80 chars)
- Body ≤180 words: acknowledge their visit, present the fit-data proof,
  pre-order incentive, single CTA.
Constraints: claims from the capability sheet only; no false scarcity.`;

// ── Social board ─────────────────────────────────────────────────────────────

function SocialBoard({ data }: { data: Extract<UseCaseOutput, { kind: "socialBoard" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <p className="text-xs text-muted-foreground">
        Instagram & YouTube shown as marketing-channel examples — not claims of direct integrations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.posts.map((p, i) => (
          <motion.div key={p.headline} {...fade(i)} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest ${
              p.platform === "Instagram" ? "bg-gradient-to-r from-fuchsia-500/25 to-amber-400/25 text-fuchsia-100" :
              p.platform === "YouTube" ? "bg-red-500/15 text-red-200" : "bg-cyan-400/10 text-cyan-200"
            }`}>
              {p.platform}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold leading-snug">{p.headline}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Analytics dashboard ──────────────────────────────────────────────────────

function Analytics({ data }: { data: Extract<UseCaseOutput, { kind: "analytics" }> }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.05] p-3">
        <p className="text-xs font-semibold text-amber-100">{data.disclaimer}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {data.metrics.map((m, i) => (
          <motion.div key={m.label} {...fade(i)} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-lg font-extrabold tracking-tight">{m.value}</p>
            <p className={`text-[11px] font-semibold ${m.good ? "text-emerald-300" : "text-rose-300"}`}>
              {m.delta > 0 ? "+" : ""}{m.delta}% vs prior
            </p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          { title: "What worked", items: data.worked, color: "text-emerald-300", ring: "border-emerald-300/20 bg-emerald-300/[0.04]", icon: CircleCheck },
          { title: "What didn't", items: data.didnt, color: "text-rose-300", ring: "border-rose-300/20 bg-rose-300/[0.04]", icon: AlertTriangle },
          { title: "Possible reasons (hypotheses)", items: data.reasons, color: "text-amber-300", ring: "border-amber-300/20 bg-amber-300/[0.04]", icon: ShieldQuestion },
          { title: "What to test next", items: data.testNext, color: "text-cyan-300", ring: "border-cyan-300/20 bg-cyan-300/[0.04]", icon: FlaskConical },
        ].map((block) => (
          <div key={block.title} className={`rounded-2xl border p-4 ${block.ring}`}>
            <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${block.color}`}>
              <block.icon className="h-3.5 w-3.5" /> {block.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-snug text-foreground/85">
              {block.items.map((i) => <li key={i}>• {i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Experiment card ──────────────────────────────────────────────────────────

function Experiment({ data }: { data: Extract<UseCaseOutput, { kind: "experiment" }> }) {
  return (
    <div className="space-y-3">
      <SampleBadge />
      {[
        ["Hypothesis", data.hypothesis, ShieldQuestion],
        ["The change", data.change, FlaskConical],
        ["Measurement", data.measure, Search],
        ["Success criteria", data.successCriteria, CircleCheck],
        ["Timeline & power math", data.timeline, Lightbulb],
      ].map(([label, value, Icon], i) => {
        const I = Icon as typeof ShieldQuestion;
        return (
          <motion.div key={label as string} {...fade(i)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              <I className="h-3.5 w-3.5" /> {label as string}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{value as string}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Insights board ───────────────────────────────────────────────────────────

function Insights({ data }: { data: Extract<UseCaseOutput, { kind: "insights" }> }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-bold">{data.headline}</h3>
        <SampleBadge />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.cards.map((c, i) => (
          <motion.div
            key={c.title}
            {...fade(i)}
            className={`rounded-2xl border p-4 ${
              c.tone === "positive" ? "border-emerald-300/20 bg-emerald-300/[0.04]" :
              c.tone === "risk" ? "border-rose-300/20 bg-rose-300/[0.04]" :
              "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p className={`text-sm font-bold ${
              c.tone === "positive" ? "text-emerald-200" :
              c.tone === "risk" ? "text-rose-200" : "text-foreground"
            }`}>{c.title}</p>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Positioning map ──────────────────────────────────────────────────────────

function PositioningMap({ data }: { data: Extract<UseCaseOutput, { kind: "positioning" }> }) {
  return (
    <div className="space-y-4">
      <SampleBadge />
      <div className="relative h-72 w-full rounded-2xl border border-white/10 grid-bg sm:h-80">
        <div className="absolute inset-x-0 top-1 text-center text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">{data.axes.y.split("←→")[1]}</div>
        <div className="absolute inset-x-0 bottom-1 text-center text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">{data.axes.y.split("←→")[0]}</div>
        <div className="absolute inset-y-0 left-1 flex items-center text-[9px] font-semibold tracking-widest text-muted-foreground [writing-mode:vertical-lr]">{data.axes.x.split("←→")[0]}</div>
        <div className="absolute inset-y-0 right-1 flex items-center text-[9px] font-semibold tracking-widest text-muted-foreground [writing-mode:vertical-lr]">{data.axes.x.split("←→")[1]}</div>
        {data.points.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
              p.name.startsWith("Open")
                ? "border-dashed border-cyan-300/60 bg-cyan-300/10 text-cyan-200"
                : p.ours
                  ? "glow-primary border-fuchsia-300/70 bg-fuchsia-400/20 text-fuchsia-100"
                  : "border-white/20 bg-card text-foreground/80"
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.name}
          </motion.div>
        ))}
      </div>
      <div className="glass rounded-2xl p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Takeaway</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{data.takeaway}</p>
      </div>
    </div>
  );
}

// ── Calendar (routine output) ────────────────────────────────────────────────

function CalendarOut({ data }: { data: Extract<UseCaseOutput, { kind: "calendar" }> }) {
  return (
    <div className="space-y-3">
      <SampleBadge />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {data.entries.map((e, i) => (
          <motion.div key={e.day} {...fade(i)} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4">
            <p className="text-xs font-bold tracking-widest text-cyan-300">{e.day}</p>
            <p className="mt-1.5 text-sm font-semibold">{e.focus}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {e.blocks.map((b) => (
                <span key={b} className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="glass rounded-2xl p-4 text-center">
        <p className="text-gradient text-sm font-extrabold tracking-wide">PROMPTS + SKILLS + CONNECTORS + LOOPS = MARKETING ROUTINE ↺</p>
      </div>
    </div>
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────────────

export function OutputRenderer({ output }: { output: UseCaseOutput }) {
  switch (output.kind) {
    case "competitorDashboard": return <CompetitorDashboard data={output} />;
    case "themes": return <Themes data={output} />;
    case "scorecard": return <Scorecard data={output} />;
    case "campaignCanvas": return <CampaignCanvas data={output} />;
    case "copyLab": return <CopyLab data={output} />;
    case "emailPreview": return <EmailPreview data={output} />;
    case "socialBoard": return <SocialBoard data={output} />;
    case "analytics": return <Analytics data={output} />;
    case "experiment": return <Experiment data={output} />;
    case "insights": return <Insights data={output} />;
    case "positioning": return <PositioningMap data={output} />;
    case "calendar": return <CalendarOut data={output} />;
  }
}
