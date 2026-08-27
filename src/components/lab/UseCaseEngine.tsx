import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  CircleDashed,
  Loader2,
  Play,
  Repeat,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";
import { RUN_STAGES } from "@/lib/ai-engine";
import type { UseCase } from "@/lib/lab-types";
import { COMPANY_CONTEXT, USE_CASES } from "@/data/useCases";
import { OutputRenderer } from "@/components/lab/outputs";
import { StepVisual, StepPipeline, getStepConfig } from "@/components/lab/StepVisuals";

const CATEGORIES = ["All", "Research", "Create", "Optimize", "Operate"] as const;

const CATEGORY_EMOJI: Record<string, string> = {
  Research: "🔬",
  Create: "🎨",
  Optimize: "📈",
  Operate: "⚙️",
};

// ── Grid ─────────────────────────────────────────────────────────────────────

function UseCaseGrid({ onOpen }: { onOpen: (uc: UseCase) => void }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const { completedUseCases, lastUseCaseId } = useLab();

  const list = USE_CASES.filter((u) => cat === "All" || u.category === cat);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
              cat === c
                ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200"
                : "border-white/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            {c === "All" ? `All · ${USE_CASES.length}` : `${CATEGORY_EMOJI[c]} ${c}`}
          </button>
        ))}
      </div>

      {lastUseCaseId && (
        <div className="mx-auto mb-6 w-fit">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-white/15 bg-white/5"
            onClick={() => {
              const uc = USE_CASES.find((u) => u.id === lastUseCaseId);
              if (uc) onOpen(uc);
            }}
          >
            <Repeat className="mr-2 h-3.5 w-3.5" />
            Resume where you left off: {USE_CASES.find((u) => u.id === lastUseCaseId)?.title}
          </Button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((uc, i) => (
          <motion.button
            key={uc.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: Math.min(i * 0.03, 0.3) }}
            onClick={() => onOpen(uc)}
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_8px_40px_rgba(56,189,248,0.12)] focus-visible:border-cyan-300/50 focus-visible:outline-none ${
              completedUseCases.includes(uc.id)
                ? "border-emerald-300/25 bg-emerald-300/[0.04]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-cyan-400/10 blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
            <span className="text-2xl">{uc.emoji}</span>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-bold tracking-tight group-hover:text-cyan-100">
              {uc.title}
              {completedUseCases.includes(uc.id) && (
                <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
              )}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{uc.summary}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300/90">
              Open workflow <ArrowRight className="h-3 w-3" />
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Inline prompt SVG (used in prompt step) ─────────────────────────────────

function PromptSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="104" height="64" rx="6" fill="rgba(34,211,238,0.04)" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
      <text x="16" y="22" fill="#67e8f9" fontSize="6" fontWeight="bold" opacity="0.7">CONTEXT</text>
      <rect x="16" y="25" width="50" height="3" rx="1.5" fill="#22d3ee" opacity="0.2" />
      <text x="16" y="36" fill="#a78bfa" fontSize="6" fontWeight="bold" opacity="0.7">OBJECTIVE</text>
      <rect x="16" y="39" width="42" height="3" rx="1.5" fill="#a78bfa" opacity="0.2" />
      <text x="16" y="50" fill="#34d399" fontSize="6" fontWeight="bold" opacity="0.7">TASK</text>
      <rect x="16" y="53" width="38" height="3" rx="1.5" fill="#34d399" opacity="0.2" />
      <text x="16" y="64" fill="#f472b6" fontSize="6" fontWeight="bold" opacity="0.7">CONSTRAINTS</text>
      <rect x="16" y="67" width="55" height="3" rx="1.5" fill="#f472b6" opacity="0.2" />
      <rect x="75" y="20" width="32" height="42" rx="4" stroke="#f472b6" strokeWidth="1.2" opacity="0.5" />
      <text x="91" y="38" textAnchor="middle" fill="#f9a8d4" fontSize="5.5" fontWeight="bold">STRUCTURED</text>
      <text x="91" y="46" textAnchor="middle" fill="#f9a8d4" fontSize="5.5" fontWeight="bold">PROMPT</text>
      <path d="M68 35 L75 35" stroke="#67e8f9" strokeWidth="1" opacity="0.5" markerEnd="url(#pArrow)" />
      <defs><marker id="pArrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#22d3ee" opacity="0.6" /></marker></defs>
    </svg>
  );
}

// ── Skill step visual ───────────────────────────────────────────────────────

function SkillVisualStep() {
  const stages = [
    { k: "INPUT", desc: "Define what raw material enters", color: "from-cyan-400 to-sky-400" },
    { k: "COLLECT", desc: "Gather into one place", color: "from-sky-400 to-indigo-400" },
    { k: "CATEGORIZE", desc: "Sort into buckets", color: "from-indigo-400 to-violet-400" },
    { k: "COMPARE", desc: "Side-by-side on shared dims", color: "from-violet-400 to-fuchsia-400" },
    { k: "GAPS", desc: "Find what's missing", color: "from-fuchsia-400 to-rose-400" },
    { k: "INSIGHT", desc: "Synthesize decisions", color: "from-rose-400 to-amber-400" },
    { k: "QC", desc: "Audit the draft", color: "from-amber-400 to-emerald-400" },
    { k: "OUTPUT", desc: "Deliver in agreed format", color: "from-emerald-400 to-cyan-400" },
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-violet-300 mb-3">Skill pipeline · reusable method</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {stages.map((s, i) => (
          <div key={s.k} className="flex items-center gap-1.5">
            <div className="group relative">
              <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${s.color} bg-opacity-10 px-3 py-2 text-center transition-all hover:scale-105 hover:border-white/25`}>
                <p className="text-[10px] font-bold tracking-wider text-foreground/90">{s.k}</p>
              </div>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 w-36 -translate-x-1/2 rounded-lg border border-white/15 bg-popover/95 p-2 text-[10px] leading-snug text-popover-foreground opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                {s.desc}
              </div>
            </div>
            {i < stages.length - 1 && <span className="text-white/20">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">A prompt = one instruction. A skill = this whole pipeline, reusable every single week.</p>
    </div>
  );
}

// ── Connector step visual ─────────────────────────────────────────────────────

function ConnectorVisualStep({ uc }: { uc: UseCase }) {
  const sources = [
    { label: "Documents", desc: uc.steps[2]?.answer?.split(".")[0] ?? uc.sources[0]?.description ?? "Data source", icon: "📄" },
    { label: "Spreadsheets", desc: "Exported data in rows and columns", icon: "📊" },
    { label: "Public sources", desc: "Pages you collect and paste in", icon: "🌐" },
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">Data flow · where information comes from</p>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2">
          {sources.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="text-lg">{s.icon}</span>
              <div>
                <p className="text-[11px] font-bold text-foreground/90">{s.label}</p>
                <p className="text-[10px] text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-400/50 to-violet-400/50" />
          <svg width="12" height="8" viewBox="0 0 12 8"><path d="M6 0 L12 4 L6 8" fill="#a78bfa" opacity="0.6" /></svg>
          <div className="h-10 w-24 rounded-xl border border-violet-300/30 bg-violet-300/[0.08] flex items-center justify-center">
            <p className="text-[10px] font-bold text-violet-200">CLAUDE</p>
          </div>
          <svg width="12" height="8" viewBox="0 0 12 8"><path d="M0 4 L6 0 L12 4 L6 8" fill="#34d399" opacity="0.4" /></svg>
          <div className="h-0.5 w-8 bg-gradient-to-r from-emerald-400/50 to-cyan-400/50" />
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Only supply data you're authorized to use. Claude has no memory of your private information.</p>
    </div>
  );
}

// ── Wizard ───────────────────────────────────────────────────────────────────

function RunPanel({ onDone }: { onDone: () => void }) {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;
    const tick = () => {
      if (cancelled) return;
      setStageIdx(idx++);
      if (idx >= RUN_STAGES.length) {
        setTimeout(() => !cancelled && onDone(), 500);
        return;
      }
      setTimeout(tick, 420);
    };
    const start = setTimeout(tick, 350);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass mx-auto max-w-md rounded-3xl p-6 text-center"
    >
      <Loader2 className="mx-auto h-7 w-7 animate-spin text-cyan-300" />
      <p className="mt-4 text-sm font-semibold">Claude is working through your skill…</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={stageIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 h-5 text-xs text-muted-foreground"
        >
          {RUN_STAGES[Math.min(stageIdx, RUN_STAGES.length - 1)]}
        </motion.p>
      </AnimatePresence>
      <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
          animate={{ width: `${Math.min(((stageIdx + 1) / RUN_STAGES.length) * 100, 100)}%` }}
        />
      </div>
    </motion.div>
  );
}

function Wizard({ uc, onClose }: { uc: UseCase; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [outputReady, setOutputReady] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const { completeUseCase } = useLab();

  const total = uc.steps.length;
  const current = uc.steps[step];
  const isOutputStep = step === 6; // OUTPUT stage
  const stepCfg = getStepConfig(step);
  const StepIcon = stepCfg.icon;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const next = () => {
    if (isOutputStep && !running && !outputReady) {
      setRunning(true);
      return;
    }
    if (step === total - 1) {
      completeUseCase(uc.id);
      onClose();
      document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-background/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${uc.title} workflow`}
    >
      <div ref={topRef} />
      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* header */}
        <div className="glass sticky top-4 z-10 mb-6 flex items-center gap-3 rounded-2xl p-3 pl-4">
          <span className="text-2xl">{uc.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{uc.title}</p>
            <div className="mt-1.5">
              <StepPipeline currentStep={step} total={total} />
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold tracking-wider text-muted-foreground">
            {step + 1}/{total}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 rounded-full hover:bg-white/10"
            aria-label="Close workflow"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28 }}
            className="space-y-5 pb-32"
          >
            {!isOutputStep || outputReady ? (
              <>
                {/* ── Step header with illustration ──────────────────────── */}
                <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${stepCfg.bgGlow} p-3`}>  
                    <div className="aspect-[4/3]">
                      <StepIcon />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-3 py-1.5">
                      <p className={`text-[10px] font-bold tracking-widest ${stepCfg.color}`}>STEP {String(step + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                      {current.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{current.question ?? current.screenTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.answer ?? current.explanation}</p>
                  </div>
                </div>

                {/* ── Step-specific content ──────────────────────────────── */}
                <div className="glass rounded-3xl p-5 sm:p-6">
                  {isOutputStep ? (
                    <OutputRenderer output={uc.output as any} />
                  ) : step === 4 ? (
                    /* PROMPT step shows the full prompt */
                    <div>
                      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-300/[0.08] to-transparent p-3">
                          <div className="aspect-[3/2]"><PromptSvg /></div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Prompt anatomy</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">Every section of this prompt has a purpose. Context sets the scene, constraints prevent hallucination, and the output format makes results comparable week over week.</p>
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-4">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                          Copy-paste prompt · swap in your own context
                        </p>
                        <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-foreground/90">{uc.prompt}</pre>
                      </div>
                      <button
                        onClick={() => navigator.clipboard?.writeText(`${COMPANY_CONTEXT}\n\n${uc.prompt}`).catch(() => {})}
                        className="mt-2 text-xs text-cyan-300 underline-offset-2 hover:underline"
                      >
                        Copy prompt + company context to clipboard
                      </button>
                    </div>
                  ) : step === 3 ? (
                    /* SKILL step shows stages visually */
                    <SkillVisualStep />
                  ) : step === 2 ? (
                    /* CONNECTOR step shows data flow */
                    <ConnectorVisualStep uc={uc} />
                  ) : (
                    <div className="flex gap-3">
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      <p className="leading-relaxed text-foreground/90">{current.answer}</p>
                    </div>
                  )}

                  {/* ── Visual below every non-output step ─────────── */}
                  {!isOutputStep && <StepVisual stepIndex={step} useCaseName={uc.title} />}

                  {isOutputStep && outputReady && (
                    <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                          <ShieldCheck className="h-4 w-4" /> Step 08 · What should you verify?
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {uc.reviewChecklist.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                          Turn this insight into…
                        </p>
                        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                          {uc.nextActions.map((a) => (
                            <div key={a.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                              <p className="text-sm font-semibold">{a.label}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{a.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-violet-300/25 bg-violet-300/[0.05] p-4">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-300">
                          <Repeat className="h-4 w-4" /> Loop it
                        </p>
                        <p className="mt-1.5 text-sm text-violet-100/85">{uc.loopTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : running ? (
              <RunPanel
                onDone={() => {
                  setRunning(false);
                  setOutputReady(true);
                }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* footer nav */}
        <div className="glass fixed inset-x-4 bottom-4 z-10 mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-2xl p-3 sm:inset-x-6">
          <Button
            variant="outline"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-full border-white/15"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <p className="hidden text-xs text-muted-foreground sm:block">
            {uc.steps[step].title} — every step ends in something you can act on
          </p>
          <Button
            size="sm"
            onClick={next}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 font-semibold text-slate-950 hover:opacity-90"
          >
            {step === total - 1 ? (
              <>Finish & mark complete</>
            ) : isOutputStep && !outputReady ? (
              <><Play className="mr-1.5 h-4 w-4" /> Run analysis</>
            ) : (
              <>Next <ArrowRight className="ml-1.5 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function UseCaseEngine() {
  const [active, setActive] = useState<UseCase | null>(null);
  const { markSectionVisited } = useLab();

  useEffect(() => {
    markSectionVisited("usecases");
    const open = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const uc = USE_CASES.find((u) => u.id === id);
      if (uc) setActive(uc);
    };
    window.addEventListener("open-use-case", open);
    return () => window.removeEventListener("open-use-case", open);
  }, [markSectionVisited]);

  return (
    <section id="usecases" className="relative py-24 sm:py-32">
      <div className="aurora-blob right-[8%] top-[15%] h-72 w-72 bg-cyan-600/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">The Heart of the Lab</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            What do you want to <span className="text-gradient">accomplish?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick a marketing problem. You'll get an immersive guided workflow —
            business question to recurring loop — with a full sample prompt and a
            visual simulated result at every step.
          </p>
        </div>
        <UseCaseGrid onOpen={setActive} />
      </div>

      <AnimatePresence>
        {active && <Wizard uc={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
