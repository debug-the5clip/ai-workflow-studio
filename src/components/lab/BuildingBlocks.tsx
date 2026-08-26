import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CircleArrowLeft,
  FileSpreadsheet,
  FileText,
  Globe,
  MessageSquareText,
  PackageSearch,
  Repeat,
  Sparkles,
  Users,
  Wand2,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CONNECTORS,
  LOOP_STAGES,
  PROMPT_COMPONENTS,
  ROUTINE_WEEK,
  SKILL_STAGES,
  STRONG_PROMPT,
  WEAK_PROMPT,
} from "@/data/content";

const BLOCKS = [
  { id: "prompt", label: "Prompt", icon: MessageSquareText, tint: "from-cyan-400/25 to-cyan-400/5" },
  { id: "skill", label: "Skill", icon: Wrench, tint: "from-sky-400/25 to-sky-400/5" },
  { id: "connector", label: "Connector", icon: ArrowRight, tint: "from-indigo-400/25 to-indigo-400/5" },
  { id: "loop", label: "Loop", icon: Repeat, tint: "from-violet-400/25 to-violet-400/5" },
  { id: "routine", label: "Routine", icon: Calendar, tint: "from-fuchsia-400/25 to-fuchsia-400/5" },
] as const;

type BlockId = (typeof BLOCKS)[number]["id"];

// ── Prompt Lab ───────────────────────────────────────────────────────────────

function PromptLab() {
  const [improved, setImproved] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-rose-300/80">Weak prompt</p>
        <div className="rounded-2xl border border-rose-300/20 bg-rose-400/[0.05] p-4 font-mono text-sm text-muted-foreground">
          “{WEAK_PROMPT}”
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          No context, no scope, no method, no format. Claude would have to invent
          everything — competitors? which features? what output? The result:
          generic filler you can't trust.
        </p>
        <Button
          onClick={() => setImproved((v) => !v)}
          disabled={improved}
          className="mt-4 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 font-semibold text-slate-950 hover:opacity-90"
        >
          <Wand2 className="mr-2 h-4 w-4" /> {improved ? "Transformed ✓" : "Improve this prompt"}
        </Button>

        <AnimatePresence>
          {improved && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300/90">
                <Sparkles className="h-3.5 w-3.5" /> Strong prompt
              </p>
              <motion.div
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                className="glow-primary rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-4 font-mono text-[13px] leading-relaxed text-foreground/90"
              >
                “{STRONG_PROMPT}”
              </motion.div>
              <p className="mt-3 text-sm text-muted-foreground">
                Same task — but now Claude knows the industry, the comparison
                dimensions, the evidence rules and the required output. Tap each
                component on the right to see what it contributes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-300/90">
          Anatomy of a strong prompt
        </p>
        <div className="flex flex-wrap gap-2">
          {PROMPT_COMPONENTS.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelected(c.key === selected ? null : c.key)}
              aria-pressed={c.key === selected}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                c.key === selected
                  ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-200 shadow-[0_0_16px_rgba(56,189,248,0.25)]"
                  : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-cyan-300/30 hover:text-foreground"
              }`}
            >
              {c.key}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass mt-4 rounded-2xl p-4"
            >
              <p className="text-sm font-semibold">{selected}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {PROMPT_COMPONENTS.find((c) => c.key === selected)?.text}
              </p>
              <p className="mt-2 border-t border-white/10 pt-2 text-sm text-cyan-200/90">
                <span className="font-semibold">Why it matters:</span>{" "}
                {PROMPT_COMPONENTS.find((c) => c.key === selected)?.contribution}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="empty-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-muted-foreground"
            >
              Select any component above to learn its role. A strong prompt is a
              system, not a sentence.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Skill Builder ────────────────────────────────────────────────────────────

function SkillBuilder() {
  const [stage, setStage] = useState(0);
  const current = SKILL_STAGES[stage];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Competitor Intelligence Skill · sample custom skill
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {SKILL_STAGES.map((s, i) => (
              <button
                key={s.stage}
                onClick={() => setStage(i)}
                aria-pressed={i === stage}
                className={`relative rounded-xl border px-2 py-3 text-[11px] font-bold tracking-wide transition-all ${
                  i === stage
                    ? "border-sky-300/60 bg-sky-300/10 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.2)]"
                    : i < stage
                      ? "border-emerald-300/25 bg-emerald-300/[0.06] text-emerald-200/80"
                      : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-sky-300/30"
                }`}
              >
                {i < stage && <span className="absolute right-1 top-1 text-[9px]">✓</span>}
                {s.stage}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-white/15"
              onClick={() => setStage((s) => Math.max(0, s - 1))}
              disabled={stage === 0}
            >
              <CircleArrowLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground">
              Stage {stage + 1} of {SKILL_STAGES.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-white/15"
              onClick={() => setStage((s) => Math.min(SKILL_STAGES.length - 1, s + 1))}
              disabled={stage === SKILL_STAGES.length - 1}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Custom vs official */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold">Custom Skill ✍️</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Built by you: your stages, your quality bar, your output format.
              This competitor-intelligence method is an example of a custom skill
              a marketing team writes for itself.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold">Official Skills 📦</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Some environments offer ready-made skills from Anthropic and
              partners. Availability changes over time — always check{" "}
              <a href="https://claude.com/blog" target="_blank" rel="noreferrer" className="text-cyan-300 underline underline-offset-2">
                official Claude documentation
              </a>{" "}
              rather than assuming a specific skill is built in.
            </p>
          </div>
        </div>
      </div>

      <div className="glass self-start rounded-2xl p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.stage}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
          >
            <p className="text-lg font-bold tracking-widest text-sky-200">{current.stage}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 border-t border-white/10 pt-3 text-xs text-muted-foreground">
          A prompt = one instruction. A skill = this whole pipeline, reusable every
          single week.
        </p>
      </div>
    </div>
  );
}

// ── Connectors ───────────────────────────────────────────────────────────────

const ICONS = {
  file: FileText,
  sheet: FileSpreadsheet,
  chart: PackageSearch,
  box: PackageSearch,
  users: Users,
  globe: Globe,
};

function ConnectorsDemo() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CONNECTORS.map((c) => {
          const Icon = ICONS[c.icon as keyof typeof ICONS];
          const isReal = c.type === "connector";
          return (
            <div
              key={c.name}
              className={`group relative rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${
                isReal
                  ? "border-cyan-300/25 bg-cyan-300/[0.05] hover:shadow-[0_0_28px_rgba(56,189,248,0.15)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${isReal ? "text-cyan-300" : "text-muted-foreground"}`} />
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isReal
                      ? "bg-cyan-300/15 text-cyan-200"
                      : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {isReal ? "Works today" : "Possible data source"}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold">{c.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
            </div>
          );
        })}
      </div>
      <div className="glass mt-5 grid gap-3 rounded-2xl p-5 sm:grid-cols-3">
        {[
          { k: "CONNECTOR", v: "= where the information comes FROM" },
          { k: "SKILL", v: "= how Claude processes the work" },
          { k: "PROMPT", v: "= what we ask Claude to do" },
        ].map((r) => (
          <div key={r.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs font-bold tracking-widest text-fuchsia-300">{r.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.v}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Note: platform integrations evolve. Only treat a service as a live Claude
        connector if official documentation says so — everything else here is a
        source you supply yourself.
      </p>
    </div>
  );
}

// ── Loop ─────────────────────────────────────────────────────────────────────

function LoopDemo() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStage((s) => (s + 1) % LOOP_STAGES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      {/* circular diagram */}
      <div className="relative mx-auto aspect-square w-full max-w-[340px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="36" fill="none" stroke="url(#loopGrad)" strokeWidth="0.7" strokeDasharray="2.5 3" />
          <defs>
            <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          {/* traveling pulse */}
          <motion.circle
            r="1.6"
            fill="#67e8f9"
            animate={{
              cx: [50 + 36 * Math.cos(0), 50 + 36 * Math.cos(Math.PI / 2), 50 + 36 * Math.cos(Math.PI), 50 + 36 * Math.cos(3 * Math.PI / 2), 50 + 36 * Math.cos(2 * Math.PI)],
              cy: [50 + 36 * Math.sin(0), 50 + 36 * Math.sin(Math.PI / 2), 50 + 36 * Math.sin(Math.PI), 50 + 36 * Math.sin(3 * Math.PI / 2), 50 + 36 * Math.sin(2 * Math.PI)],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        {LOOP_STAGES.map((s, i) => {
          const angle = (i / LOOP_STAGES.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 36 * Math.cos(angle);
          const y = 50 + 36 * Math.sin(angle);
          return (
            <button
              key={s.stage}
              onClick={() => setStage(i)}
              aria-pressed={i === stage}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1.5 text-[10px] font-bold tracking-wide transition-all sm:text-[11px] ${
                i === stage
                  ? "scale-110 border-cyan-300/70 bg-cyan-300/15 text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                  : "border-white/15 bg-card/90 text-muted-foreground hover:text-foreground"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {s.stage}
            </button>
          );
        })}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Repeat className="mx-auto h-6 w-6 text-cyan-300/70" />
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Campaign<br />Optimization
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
              Loop stage {stage + 1} · {LOOP_STAGES[stage].stage}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{LOOP_STAGES[stage].example}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-muted-foreground">
          One campaign cycle: created → observed → analyzed → learned → improved.
          Click any stage to step through the luggage-brand example.
        </p>
      </div>
    </div>
  );
}

// ── Routine ──────────────────────────────────────────────────────────────────

function RoutineDemo() {
  const [assembled, setAssembled] = useState(false);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {ROUTINE_WEEK.map((d, i) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border p-4 transition-all ${
              assembled
                ? "border-cyan-300/25 bg-gradient-to-b from-cyan-300/[0.07] to-transparent shadow-[0_0_24px_rgba(56,189,248,0.1)]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p className="text-xs font-bold tracking-widest text-cyan-300">{d.day}</p>
            <p className="mt-1.5 text-sm font-semibold">{d.focus}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setAssembled(true)}
          disabled={assembled}
          className="rounded-full border-white/15 bg-white/5"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {assembled ? "Assembled into one workflow ✓" : "Combine into a workflow"}
        </Button>
        <AnimatePresence>
          {assembled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl p-5 text-center"
            >
              {["PROMPTS", "+", "SKILLS", "+", "CONNECTORS", "+", "LOOPS"].map((t, i) =>
                t === "+" ? (
                  <span key={i} className="text-cyan-300">+</span>
                ) : (
                  <span key={i} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-bold tracking-wider">
                    {t}
                  </span>
                ),
              )}
              <span className="mx-1 text-lg text-cyan-300">=</span>
              <span className="text-gradient text-base font-extrabold tracking-wide">
                YOUR MARKETING ROUTINE ↺
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Section shell ────────────────────────────────────────────────────────────

export function BuildingBlocks() {
  const [tab, setTab] = useState<BlockId>("prompt");
  const active = BLOCKS.find((b) => b.id === tab)!;

  return (
    <section id="blocks" className="relative py-24 sm:py-32">
      <div className="aurora-blob left-[5%] top-[30%] h-72 w-72 bg-violet-600/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">Learn</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Five building blocks behind <span className="text-gradient">the workflow</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every AI-assisted marketing workflow is assembled from the same five
            parts. Don't just read about them — operate each one below.
          </p>
        </div>

        {/* Block selector cards */}
        <div className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {BLOCKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setTab(b.id)}
              aria-pressed={tab === b.id}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                tab === b.id
                  ? "border-cyan-300/50 shadow-[0_0_28px_rgba(56,189,248,0.18)]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${b.tint} ${tab === b.id ? "opacity-100" : "opacity-40 group-hover:opacity-70"} transition-opacity`} />
              <b.icon className="relative h-5 w-5 text-foreground/90" />
              <p className="relative mt-2 text-sm font-bold tracking-wide">{b.label}</p>
              <p className="relative text-[11px] text-muted-foreground">
                {{ prompt: "One instruction", skill: "Reusable method", connector: "Where data comes from", loop: "Repeating cycle", routine: "Weekly rhythm" }[b.id]}
              </p>
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-card/50 p-5 backdrop-blur sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <active.icon className="h-4 w-4 text-cyan-300" />
                Interactive demo · {active.label}
              </p>
              {tab === "prompt" && <PromptLab />}
              {tab === "skill" && <SkillBuilder />}
              {tab === "connector" && <ConnectorsDemo />}
              {tab === "loop" && <LoopDemo />}
              {tab === "routine" && <RoutineDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
