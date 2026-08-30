import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
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
import type { UseCase, UseCaseOutput } from "@/lib/lab-types";
import { COMPANY_CONTEXT, USE_CASES } from "@/data/useCases";
import { OutputRenderer } from "@/components/lab/outputs";

const CATEGORIES = ["All", "Research", "Strategy", "Content", "Performance", "Operations"] as const;

const CATEGORY_EMOJI: Record<string, string> = {
  Research: "🔬",
  Strategy: "🎯",
  Content: "✍️",
  Performance: "📊",
  Operations: "⚙️",
};

const STEP_META = [
  { label: "Define", icon: "❓", color: "#8B6CFC" },
  { label: "Evidence", icon: "📋", color: "#4A7BF7" },
  { label: "Source", icon: "📂", color: "#FF9B54" },
  { label: "Skill", icon: "🧰", color: "#8B6CFC" },
  { label: "Prompt", icon: "✍️", color: "#6C5CE7" },
  { label: "Result", icon: "📊", color: "#FF8FA3" },
  { label: "Insight", icon: "💡", color: "#67C587" },
  { label: "Action", icon: "🎯", color: "#FF7B72" },
];

// ── Run Panel with loading states ──────────────────────────────────────────────

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
    return () => { cancelled = true; clearTimeout(start); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-md rounded-3xl border border-[#E8E4DE] bg-white p-6 text-center shadow-sm">
      <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#6C5CE7]" />
      <p className="mt-4 text-sm font-semibold text-[#2D2D2D]">Claude is working through your skill…</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={stageIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 h-5 text-xs text-[#8A8A82]"
        >
          {RUN_STAGES[Math.min(stageIdx, RUN_STAGES.length - 1)]}
        </motion.p>
      </AnimatePresence>
      <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-[#E8E4DE]">
        <motion.div
          className="h-full rounded-full bg-[#6C5CE7]"
          animate={{ width: `${Math.min(((stageIdx + 1) / RUN_STAGES.length) * 100, 100)}%` }}
        />
      </div>
    </motion.div>
  );
}

// ── Skill step visual (compact for workflow) ────────────────────────────────────

function SkillVisualInline() {
  const stages = ["INPUT", "COLLECT", "CATEGORIZE", "COMPARE", "GAPS", "INSIGHT", "QC", "OUTPUT"];
  return (
    <div className="rounded-2xl border border-[#E8E4DE] bg-[#FFF8F0] p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8B6CFC]">Skill pipeline · reusable method</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="rounded-lg border border-[#E8E4DE] bg-white px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#2D2D2D] shadow-sm">{s}</span>
            {i < stages.length - 1 && <span className="text-[#E8E4DE]">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#8A8A82]">A prompt = one instruction. A skill = this whole pipeline, reusable every single week.</p>
    </div>
  );
}

// ── Prompt anatomy display ──────────────────────────────────────────────────────

function PromptAnatomy({ uc }: { uc: UseCase }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard?.writeText(`${COMPANY_CONTEXT}\n\n${uc.prompt}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[#E8E4DE] bg-[#FFF8F0] p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">Why this prompt works</p>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {uc.promptBreakdown.map((part) => (
            <div key={part.label} className="flex items-start gap-2 rounded-lg bg-white border border-[#E8E4DE] px-3 py-2">
              <span className="shrink-0 text-[10px] font-bold tracking-wider text-[#6C5CE7]">{part.label}</span>
              <span className="text-[11px] leading-snug text-[#8A8A82]">{part.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#67C587]/30 bg-[#67C587]/[0.04] p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#67C587]">Copy-paste prompt · swap in your own context</p>
        <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#2D2D2D]">{uc.prompt}</pre>
      </div>
      <button onClick={copyPrompt} className="flex items-center gap-1.5 text-xs font-semibold text-[#6C5CE7] hover:underline">
        {copied ? <><Check className="h-3 w-3" /> Copied!</> : "Copy prompt + company context to clipboard"}
      </button>
    </div>
  );
}

// ── Step content panels ────────────────────────────────────────────────────────

function StepContent({ uc, step, running, outputReady }: { uc: UseCase; step: number; running: boolean; outputReady: boolean }) {
  const evidenceItems = uc.evidenceNeeded;
  const sources = uc.sources;
  const meta = STEP_META[step] || STEP_META[0];

  return (
    <div className="space-y-4">
      {/* Step header */}
      <div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 w-11 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: meta.color }}
          >
            {String(step + 1).padStart(2, "0")}
          </span>
          <span className="text-lg">{meta.icon}</span>
          <h2
            className="text-lg font-bold tracking-tight text-[#2D2D2D] sm:text-xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {getDefaultStepTitle(step)}
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[#8A8A82]">
          {uc.steps[step]?.explanation || getDefaultExplanation(step)}
        </p>
      </div>

      {/* Step-specific content */}
      {step === 0 && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Your business question</p>
            <p className="text-sm font-semibold text-[#2D2D2D]">{uc.goal}</p>
          </div>
          <div className="rounded-2xl border border-[#E8E4DE] bg-[#FFF8F0] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Context</p>
            <p className="text-xs leading-relaxed text-[#8A8A82]">{uc.scenario}</p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82] mb-2">Evidence Claude needs</p>
          {evidenceItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-[#E8E4DE] bg-white px-3 py-2.5">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6C5CE7]" />
              <span className="text-sm text-[#2D2D2D]">{item}</span>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82] mb-2">Available sources</p>
          {sources.map((src) => (
            <div key={src.id} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
              src.type === "connector"
                ? "border-[#6C5CE7]/30 bg-[#6C5CE7]/[0.04]"
                : "border-dashed border-[#E8E4DE] bg-[#FFF8F0]"
            }`}>
              <span className="text-xl">{src.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#2D2D2D]">{src.name}</p>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                  src.type === "connector" ? "text-[#6C5CE7]" : "text-[#8A8A82]"
                }`}>{src.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 3 && <SkillVisualInline />}

      {step === 4 && <PromptAnatomy uc={uc} />}

      {step === 5 && !running && !outputReady && (
        <div className="text-center py-4">
          <p className="text-sm text-[#8A8A82]">Click "Run Analysis" in the footer to start.</p>
        </div>
      )}

      {step === 5 && running && (
        <RunPanel onDone={() => {}} />
      )}

      {step === 5 && outputReady && (
        <div className="space-y-5">
          <OutputRenderer output={uc.output as UseCaseOutput} />

          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">
              <ShieldCheck className="h-4 w-4" /> What should a marketer double-check?
            </p>
            <ul className="space-y-1.5">
              {uc.reviewChecklist.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-[#8A8A82]">
                  <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF7B72]" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#67C587]">Key insight</p>
            <p className="text-sm leading-relaxed text-[#2D2D2D]">
              {uc.outputDescription}
            </p>
          </div>
          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#8A8A82]">Evidence synthesis</p>
            <p className="text-sm text-[#8A8A82]">
              Claude combined {evidenceItems.length} evidence sources into a structured finding.
              Review the output above for the complete analysis.
            </p>
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#FF7B72]/20 bg-[#FF7B72]/[0.04] p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">Turn this insight into…</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {uc.nextActions.map((a) => (
                <div key={a.label} className="rounded-xl border border-[#E8E4DE] bg-white p-3">
                  <p className="text-sm font-semibold text-[#2D2D2D]">{a.label}</p>
                  <p className="mt-0.5 text-xs text-[#8A8A82]">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#FF9B54]/20 bg-[#FF9B54]/[0.04] p-4">
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF9B54]">
              <Repeat className="h-4 w-4" /> Make it repeatable
            </p>
            <p className="text-sm text-[#2D2D2D]">{uc.loopTip}</p>
          </div>
        </div>
      )}

      {/* Why it matters — shown for all non-output steps */}
      {step !== 5 && step !== 7 && (
        <div className="rounded-2xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.04] p-4">
          <p className="text-xs font-bold text-[#FF9B54]">Why this step matters</p>
          <p className="mt-1 text-xs leading-relaxed text-[#8A8A82]">
            {getWhyItMatters(step)}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Use Case Grid ──────────────────────────────────────────────────────────────

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
                ? "border-[#6C5CE7]/50 bg-[#6C5CE7]/10 text-[#6C5CE7]"
                : "border-[#E8E4DE] bg-white/60 text-[#8A8A82] hover:text-[#2D2D2D]"
            }`}
          >
            {c === "All" ? `All · ${USE_CASES.length}` : `${CATEGORY_EMOJI[c]} ${c}`}
          </button>
        ))}
      </div>

      {lastUseCaseId && (
        <div className="mx-auto mb-6 w-fit">
          <Button variant="outline" size="sm" className="rounded-full border-[#E8E4DE] bg-white/70 text-[#5A5A5A]"
            onClick={() => { const uc = USE_CASES.find((u) => u.id === lastUseCaseId); if (uc) onOpen(uc); }}>
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
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all tilt-card hover-glow focus-visible:border-[#6C5CE7]/50 focus-visible:outline-none ${
              completedUseCases.includes(uc.id)
                ? "border-[#67C587]/25 bg-[#67C587]/[0.04]"
                : "border-[#E8E4DE] bg-white/70"
            }`}
          >
            <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#6C5CE7]/10 blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
            <span className="text-2xl">{uc.emoji}</span>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-bold tracking-tight text-[#2D2D2D] group-hover:text-[#6C5CE7]">
              {uc.title}
              {completedUseCases.includes(uc.id) && (
                <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[#67C587]" />
              )}
            </p>
            <p className="mt-1.5 text-[11px] font-medium text-[#6C5CE7]/80 uppercase tracking-wider">{uc.category}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8A8A82]">{uc.scenario}</p>
            <p className="mt-2 text-[10px] text-[#8A8A82]/70">{uc.estimatedTime}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#6C5CE7]">
              Start workflow <ArrowRight className="h-3 w-3" />
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Workflow Wizard (two-column, light theme) ──────────────────────────────────

function Wizard({ uc, onClose }: { uc: UseCase; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [outputReady, setOutputReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { completeUseCase } = useLab();

  const total = uc.steps.length;
  const isOutputStep = step === 5;

  const goNext = useCallback(() => {
    if (isOutputStep && !running && !outputReady) { setRunning(true); return; }
    if (step === total - 1) {
      completeUseCase(uc.id);
      onClose();
      setTimeout(() => document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    setStep((s) => s + 1);
  }, [step, total, isOutputStep, running, outputReady, completeUseCase, uc.id, onClose]);

  const goPrev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "TEXTAREA" || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight" && step < total - 1) { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" && step > 0) { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, running, outputReady]);

  // Scroll content to top on step change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // After run completes, advance to output step
  useEffect(() => {
    if (running && !outputReady) {
      // RunPanel handles its own completion
    }
  }, [running, outputReady]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-[#FAF9F6]"
      role="dialog"
      aria-modal="true"
      aria-label={`${uc.title} workflow`}
    >
      {/* ── Fixed Header ── */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-[#E8E4DE] bg-white px-4 sm:px-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full hover:bg-[#FFF8F0] text-[#8A8A82]" aria-label="Exit workflow">
          <X className="h-4 w-4" />
        </Button>
        <span className="text-xl">{uc.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#2D2D2D]">{uc.title}</p>
          <p className="text-[10px] text-[#8A8A82] uppercase tracking-wider font-medium">{uc.category}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#E8E4DE] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#8A8A82]">
          Step {step + 1} of {total}
        </span>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* LEFT: Timeline sidebar — scrollable on mobile, sticky on desktop */}
        <div className="shrink-0 border-b border-[#E8E4DE] bg-white p-3 md:w-56 md:border-b-0 md:border-r md:p-4 md:overflow-y-auto">
          <div className="flex gap-1.5 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-x-visible md:pb-0">
            {STEP_META.map((meta, i) => {
              const done = i < step;
              const current = i === step;
              const upcoming = i > step;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (i <= step || (i <= step + 1 && !running)) setStep(i);
                  }}
                  disabled={upcoming && !(i <= step + 1 && !running)}
                  className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium transition-all ${
                    current
                      ? "bg-[#6C5CE7]/8 text-[#6C5CE7]"
                      : done
                      ? "text-[#67C587] hover:bg-[#67C587]/5"
                      : "text-[#B0B0BA] cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] font-bold ${
                      current
                        ? "bg-[#6C5CE7] text-white"
                        : done
                        ? "bg-[#67C587] text-white"
                        : "bg-[#E8E4DE] text-[#B0B0BA]"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="hidden truncate md:inline">{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Scrollable content area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {isOutputStep && running ? (
                  <RunPanel onDone={() => { setRunning(false); setOutputReady(true); }} />
                ) : (
                  <StepContent uc={uc} step={step} running={running} outputReady={outputReady} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Fixed Footer Nav ── */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-t border-[#E8E4DE] bg-white px-4 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 0}
          onClick={goPrev}
          className="rounded-full border-[#E8E4DE] text-[#2D2D2D] hover:bg-[#FFF8F0] disabled:opacity-40"
        >
          {step === 0 ? "Exit" : <><ArrowLeft className="h-4 w-4" /> Back</>}
        </Button>

        {/* Progress dots */}
        <div className="hidden items-center gap-1 sm:flex">
          {uc.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < step ? "w-4 bg-[#67C587]" :
                i === step ? "w-6 bg-[#6C5CE7]" :
                "w-1.5 bg-[#E8E4DE]"
              }`}
            />
          ))}
        </div>

        <Button
          size="sm"
          onClick={goNext}
          className="rounded-full bg-[#6C5CE7] px-5 font-semibold text-white hover:bg-[#5A4BD1]"
        >
          {step === total - 1 ? (
            "Finish & Mark Complete"
          ) : isOutputStep && !outputReady ? (
            <><Play className="mr-1.5 h-4 w-4" /> Run Analysis</>
          ) : (
            <>Next <ArrowRight className="ml-1.5 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// ── Helper text for each step ───────────────────────────────────────────────────

function getDefaultStepTitle(step: number): string {
  const titles = [
    "Define the Business Question",
    "Identify the Information Needed",
    "Choose Your Information Source",
    "Choose the Right Claude Capability",
    "Build the Instruction",
    "Run the Analysis",
    "Understand the Result",
    "Human Review",
    "Take Action",
    "Make It Repeatable",
  ];
  return titles[step] || "Step";
}

function getDefaultExplanation(step: number): string {
  const explanations = [
    "Claude works best when it knows the decision behind the question — not just the topic. A vague topic produces a vague answer. A real business question produces a usable one.",
    "Before asking Claude anything, decide what kind of proof would actually make the answer trustworthy — reviews, competitor pages, past campaign numbers, support tickets. Good inputs are what separate a confident-sounding guess from a grounded answer.",
    "Some information is public (web, published reviews). Some lives inside your own tools (a shared drive, an inbox, an analytics dashboard). Claude can use both — but only your authorized tools if they're connected.",
    "Not every task needs the same kind of setup. Some questions just need one good instruction. Others deserve a repeatable method. Pick what actually fits the size of the job.",
    "The best marketing prompts do five things: give Claude a role, give it context, state the task plainly, tell it what sources to use, and describe the output format you need.",
    "Claude reads what's available, organizes it, and drafts a structured answer. This is the same thing happening whether it's public web information or your connected business data — organize first, conclude second.",
    "A wall of text isn't useful. Claude Marketing Lab always converts the raw answer into a visual structure — themes, comparisons, opportunity cards, dashboards — so you can see the shape of the finding, not just read about it.",
    "Claude's output is a strong first draft, not a final decision. This is the point where judgment, brand knowledge, and business context get applied.",
    "An insight only has value once it changes a decision — a campaign brief, a product note, a message test, a budget shift.",
    "If you'd ask a version of this question again, decide now how it should come back: as a saved Skill (same method, next time you ask), a Loop (feeds its own next cycle), or a Routine (runs on a schedule).",
  ];
  return explanations[step] || "";
}

function getWhyItMatters(step: number): string {
  const reasons = [
    "Framing the question properly prevents Claude from giving generic marketing-speak instead of actionable analysis.",
    "Without deciding on evidence first, you risk asking Claude for an opinion instead of an analysis grounded in data.",
    "Knowing where information comes from — and whether it's authorized — is what separates trustworthy output from speculation.",
    "Choosing the right capability saves time: a Prompt for one-off questions, a Skill for recurring work, a Connector when you need real data.",
    "A well-structured prompt is the difference between a useless paragraph and a repeatable, reliable output.",
    "This is where Claude does the analytical heavy lifting — organizing, comparing, and surfacing patterns from your inputs.",
    "Visual structures make findings actionable: you can see the shape of the data instead of scrolling through text.",
    "Human review is where brand knowledge, business context, and judgment get applied. This step is never skippable.",
    "The gap between insight and impact is action. Every finding should connect to a specific next business decision.",
    "Making the work repeatable is what transforms a one-off analysis into a compounding advantage.",
  ];
  return reasons[step] || "";
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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6C5CE7]">The Heart of the Lab</p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            What do you want to <span className="text-gradient">accomplish?</span>
          </h2>
          <p className="mt-4 text-[#8A8A82]">
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
