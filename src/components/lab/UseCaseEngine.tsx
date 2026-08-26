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
            {/* progress dots */}
            <div className="mt-1.5 flex items-center gap-1">
              {uc.steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
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
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                    Step {String(step + 1).padStart(2, "0")} / {total} · {current.title}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{current.question}</h3>
                </div>

                <div className="glass rounded-3xl p-5 sm:p-6">
                  {isOutputStep ? (
                    <OutputRenderer output={uc.output} />
                  ) : step === 4 ? (
                    /* PROMPT step shows the full prompt */
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{current.answer}</p>
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
                  ) : (
                    <div className="flex gap-3">
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      <p className="leading-relaxed text-foreground/90">{current.answer}</p>
                    </div>
                  )}

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
                          {uc.actions.map((a) => (
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
