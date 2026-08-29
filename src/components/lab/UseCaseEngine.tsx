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
import type { UseCase } from "@/lib/lab-types";
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

const STEP_TITLES = [
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

const STEP_ICONS: React.ElementType[] = [
  // 0 - Define question
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <circle cx="50" cy="36" r="16" stroke="#D97757" strokeWidth="1.5" opacity="0.4" />
      <text x="50" y="40" textAnchor="middle" fill="#D97757" fontSize="16" fontWeight="bold">?</text>
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">BUSINESS QUESTION</text>
    </svg>
  ),
  // 1 - Evidence needed
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={18 + i * 26} y="18" width="20" height="14" rx="3" stroke="#D97757" strokeWidth="1" opacity="0.4" />
          <rect x={20 + i * 26} y="22" width="12" height="2" rx="1" fill="#D97757" opacity="0.3" />
          <rect x={20 + i * 26} y="27" width="8" height="2" rx="1" fill="#D97757" opacity="0.2" />
          <text x={28 + i * 26} y="46" textAnchor="middle" fill="#8A8680" fontSize="5" fontWeight="600">
            {["REVIEWS", "SURVEYS", "TICKETS"][i]}
          </text>
        </g>
      ))}
      <path d="M38 36 L50 36" stroke="#D97757" strokeWidth="0.8" opacity="0.4" markerEnd="url(#eArr)" />
      <path d="M62 36 L50 36" stroke="#D97757" strokeWidth="0.8" opacity="0.4" markerEnd="url(#eArr)" />
      <defs><marker id="eArr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#D97757" opacity="0.5" /></marker></defs>
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">EVIDENCE NEEDED</text>
    </svg>
  ),
  // 2 - Information source
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={18 + i * 30} y="18" width="24" height="18" rx="3" stroke="#6B9E8A" strokeWidth="1" opacity={0.3 + i * 0.2} fill={i === 0 ? "rgba(107,158,138,0.08)" : "none"} />
          <text x={30 + i * 30} y="30" textAnchor="middle" fill="#6B9E8A" fontSize="5" fontWeight="600">
            {i === 0 ? "CONNECTOR" : "PUBLIC"}
          </text>
          <text x={30 + i * 30} y="40" textAnchor="middle" fill="#8A8680" fontSize="4">
            {i === 0 ? "Google Drive" : "Web Search"}
          </text>
        </g>
      ))}
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">INFORMATION SOURCE</text>
    </svg>
  ),
  // 3 - Claude capability
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      {["PROMPT", "SKILL", "CONNECTOR"].map((label, i) => (
        <g key={label}>
          <rect x={16 + i * 28} y="18" width="22" height="16" rx="4" stroke="#D97757" strokeWidth={i === 1 ? 1.5 : 0.8} opacity={i === 1 ? 0.8 : 0.3} fill={i === 1 ? "rgba(217,119,87,0.1)" : "none"} />
          <text x={27 + i * 28} y="29" textAnchor="middle" fill={i === 1 ? "#D97757" : "#8A8680"} fontSize="5" fontWeight="600">{label}</text>
        </g>
      ))}
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">CAPABILITY</text>
    </svg>
  ),
  // 4 - Build instruction (prompt)
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <text x="18" y="26" fill="#D97757" fontSize="6" fontWeight="bold" opacity="0.6">ROLE</text>
      <rect x="18" y="29" width="40" height="3" rx="1.5" fill="#D97757" opacity="0.2" />
      <text x="18" y="40" fill="#6B9E8A" fontSize="6" fontWeight="bold" opacity="0.6">TASK</text>
      <rect x="18" y="43" width="50" height="3" rx="1.5" fill="#6B9E8A" opacity="0.2" />
      <text x="18" y="54" fill="#7B8EC9" fontSize="6" fontWeight="bold" opacity="0.6">FORMAT</text>
      <rect x="18" y="57" width="35" height="3" rx="1.5" fill="#7B8EC9" opacity="0.2" />
      <rect x="65" y="22" width="18" height="40" rx="4" stroke="#D97757" strokeWidth="1" opacity="0.4" />
      <text x="74" y="42" textAnchor="middle" fill="#D97757" fontSize="5" fontWeight="bold">PROMPT</text>
      <text x="50" y="74" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">INSTRUCTION</text>
    </svg>
  ),
  // 5 - Run
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <circle cx="50" cy="36" r="14" stroke="#D97757" strokeWidth="1.5" opacity="0.5" />
      <polygon points="45,28 58,36 45,44" fill="#D97757" opacity="0.6" />
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">CLAUDE WORKING</text>
    </svg>
  ),
  // 6 - Output / result
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <rect x="18" y="18" width="28" height="20" rx="4" stroke="#6B9E8A" strokeWidth="1" opacity="0.4" />
      <text x="32" y="30" textAnchor="middle" fill="#6B9E8A" fontSize="5" fontWeight="600">INSIGHT</text>
      <rect x="54" y="18" width="28" height="20" rx="4" stroke="#7B8EC9" strokeWidth="1" opacity="0.4" />
      <text x="68" y="30" textAnchor="middle" fill="#7B8EC9" fontSize="5" fontWeight="600">ACTIONS</text>
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">VISUAL OUTPUT</text>
    </svg>
  ),
  // 7 - Human review
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="20" y={20 + i * 14} width="8" height="8" rx="2" stroke="#D97757" strokeWidth="1" opacity="0.4" />
          {i < 2 && <polyline points={`22,${24 + i * 14} 24,${26 + i * 14} 28,${21 + i * 14}`} stroke="#6B9E8A" strokeWidth="1.5" fill="none" opacity="0.6" />}
          <rect x="32" y={22 + i * 14} width={30 - i * 5} height="2" rx="1" fill="#8A8680" opacity="0.3" />
        </g>
      ))}
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">HUMAN REVIEW</text>
    </svg>
  ),
  // 8 - Take action
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <circle cx="50" cy="32" r="10" stroke="#D97757" strokeWidth="1" opacity="0.4" />
      <text x="50" y="36" textAnchor="middle" fill="#D97757" fontSize="12">→</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 28} y={50} width="22" height="10" rx="3" stroke="#6B9E8A" strokeWidth="0.8" opacity={0.3 + i * 0.15} />
          <text x={27 + i * 28} y={57} textAnchor="middle" fill="#8A8680" fontSize="4">
            {["CAMPAIGN", "REPORT", "POST"][i]}
          </text>
        </g>
      ))}
      <text x="50" y="74" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">TAKE ACTION</text>
    </svg>
  ),
  // 9 - Make it repeatable (loop)
  () => (
    <svg viewBox="0 0 100 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="8" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="1.2" opacity="0.5" />
      <circle cx="50" cy="34" r="14" stroke="#D97757" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 2" />
      {["SKILL", "LOOP", "ROUTINE"].map((label, i) => {
        const angle = (i * 120 - 90) * (Math.PI / 180);
        const x = 50 + Math.cos(angle) * 14;
        const y = 34 + Math.sin(angle) * 14;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="6" fill={i === 1 ? "rgba(217,119,87,0.15)" : "rgba(217,119,87,0.06)"} stroke="#D97757" strokeWidth="0.8" opacity="0.5" />
            <text x={x} y={y + 2} textAnchor="middle" fill="#D97757" fontSize="3.5" fontWeight="600">{label}</text>
          </g>
        );
      })}
      <text x="50" y="64" textAnchor="middle" fill="#8A8680" fontSize="7" fontWeight="600">REPEATABLE</text>
    </svg>
  ),
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-md rounded-3xl border border-[#E8E6E1] bg-white p-6 text-center shadow-sm">
      <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#D97757]" />
      <p className="mt-4 text-sm font-semibold text-[#1C1C1C]">Claude is working through your skill…</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={stageIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 h-5 text-xs text-[#6B6B66]"
        >
          {RUN_STAGES[Math.min(stageIdx, RUN_STAGES.length - 1)]}
        </motion.p>
      </AnimatePresence>
      <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-[#E8E6E1]">
        <motion.div
          className="h-full rounded-full bg-[#D97757]"
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
    <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D97757]">Skill pipeline · reusable method</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="rounded-lg border border-[#E8E6E1] bg-white px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#1C1C1C] shadow-sm">{s}</span>
            {i < stages.length - 1 && <span className="text-[#E8E6E1]">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#6B6B66]">A prompt = one instruction. A skill = this whole pipeline, reusable every single week.</p>
    </div>
  );
}

// ── Connector step visual (compact for workflow) ───────────────────────────────

function ConnectorVisualInline() {
  return (
    <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D97757]">Data flow · where information comes from</p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col gap-1.5">
          {[
            { icon: "📁", label: "Google Drive", tag: "CONNECTOR" },
            { icon: "🌐", label: "Web Search", tag: "PUBLIC" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2">
              <span className="text-base">{s.icon}</span>
              <div>
                <p className="text-[11px] font-bold text-[#1C1C1C]">{s.label}</p>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B66]">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-0.5 w-6 bg-[#D97757]/30" />
          <svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 0 L8 3 L4 6" fill="#D97757" opacity="0.5" /></svg>
          <div className="rounded-lg border border-[#D97757]/30 bg-[#D97757]/5 px-3 py-1.5 text-[10px] font-bold text-[#D97757]">CLAUDE</div>
          <svg width="8" height="6" viewBox="0 0 8 6"><path d="M0 3 L4 0 L8 3 L4 6" fill="#6B9E8A" opacity="0.4" /></svg>
          <div className="h-0.5 w-6 bg-[#6B9E8A]/30" />
        </div>
      </div>
      <p className="mt-3 text-xs text-[#6B6B66]">Only supply data you're authorized to use. Claude has no memory of your private information.</p>
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
      <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#D97757]">Why this prompt works</p>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {uc.promptBreakdown.map((part) => (
            <div key={part.label} className="flex items-start gap-2 rounded-lg bg-white border border-[#E8E6E1] px-3 py-2">
              <span className={`shrink-0 text-[10px] font-bold tracking-wider ${part.color}`}>{part.label}</span>
              <span className="text-[11px] leading-snug text-[#6B6B66]">{part.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#6B9E8A]/30 bg-[#6B9E8A]/[0.04] p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6B9E8A]">Copy-paste prompt · swap in your own context</p>
        <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#1C1C1C]">{uc.prompt}</pre>
      </div>
      <button onClick={copyPrompt} className="flex items-center gap-1.5 text-xs font-semibold text-[#D97757] hover:underline">
        {copied ? <><Check className="h-3 w-3" /> Copied!</> : "Copy prompt + company context to clipboard"}
      </button>
    </div>
  );
}

// ── Use Case Grid (dark shell) ──────────────────────────────────────────────────

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
                ? "border-[#D97757]/50 bg-[#D97757]/10 text-[#D97757]"
                : "border-[#E2E0DB] bg-white/60 text-[#6B6B66] hover:text-[#1C1C1C]"
            }`}
          >
            {c === "All" ? `All · ${USE_CASES.length}` : `${CATEGORY_EMOJI[c]} ${c}`}
          </button>
        ))}
      </div>

      {lastUseCaseId && (
        <div className="mx-auto mb-6 w-fit">
          <Button variant="outline" size="sm" className="rounded-full border-[#E2E0DB] bg-white/70 text-[#4A4A46]"
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
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all tilt-card hover-glow focus-visible:border-[#D97757]/50 focus-visible:outline-none ${
              completedUseCases.includes(uc.id)
                ? "border-[#6B9E8A]/25 bg-[#6B9E8A]/[0.04]"
                : "border-[#E2E0DB] bg-white/70"
            }`}
          >
            <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#D97757]/10 blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
            <span className="text-2xl">{uc.emoji}</span>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-bold tracking-tight text-[#1C1C1C] group-hover:text-[#D97757]">
              {uc.title}
              {completedUseCases.includes(uc.id) && (
                <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[#6B9E8A]" />
              )}
            </p>
            <p className="mt-1.5 text-[11px] font-medium text-[#D97757]/80 uppercase tracking-wider">{uc.category}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{uc.scenario}</p>
            <p className="mt-2 text-[10px] text-muted-foreground/70">{uc.estimatedTime}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97757]">
              Start workflow <ArrowRight className="h-3 w-3" />
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Workflow Wizard (light theme, fixed header/footer) ──────────────────────────

function Wizard({ uc, onClose }: { uc: UseCase; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [outputReady, setOutputReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { completeUseCase } = useLab();

  const total = uc.steps.length;
  const isOutputStep = step === 6;

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "TEXTAREA" || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight" && step < total - 1) { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" && step > 0) { e.preventDefault(); setStep((s) => s - 1); }
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

  const goPrev = () => setStep((s) => Math.max(0, s - 1));

  const StepIcon = STEP_ICONS[step] || STEP_ICONS[0];

  // Evidence checklist for step 1
  const evidenceItems = uc.evidenceNeeded;
  // Source cards for step 2
  const sources = uc.sources;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label={`${uc.title} workflow`}
    >
      {/* ── Fixed Header ── */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-[#E8E6E1] bg-white px-4 sm:px-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full hover:bg-[#F2F1EE] text-[#6B6B66]" aria-label="Exit workflow">
          <X className="h-4 w-4" />
        </Button>
        <span className="text-xl">{uc.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#1C1C1C]">{uc.title}</p>
          <p className="text-[10px] text-[#6B6B66] uppercase tracking-wider font-medium">{uc.category}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#E8E6E1] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#6B6B66]">
          Step {step + 1} of {total}
        </span>
      </div>

      {/* ── Scrollable Content ── */}
      <div ref={contentRef} className="absolute inset-x-0 top-16 bottom-16 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
            >
              {!isOutputStep || outputReady ? (
                <>
                  {/* Step title */}
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D97757]">
                    Step {String(step + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-xl font-bold text-[#1C1C1C] sm:text-2xl">
                    {STEP_TITLES[step]}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6B66]">
                    {uc.steps[step]?.explanation || getDefaultExplanation(step)}
                  </p>

                  {/* Step illustration + content */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-[120px_1fr]">
                    <div className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-3">
                      <div className="aspect-[5/4]">
                        <StepIcon />
                      </div>
                    </div>
                    <div>
                      {/* Step-specific content */}
                      {step === 0 && (
                        <div className="space-y-3">
                          <div className="rounded-2xl border border-[#E8E6E1] bg-white p-4">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Your business question</p>
                            <p className="text-sm font-semibold text-[#1C1C1C]">{uc.goal}</p>
                          </div>
                          <div className="rounded-2xl border border-[#E8E6E1] bg-[#FAFAF8] p-3">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#6B6B66]">Context</p>
                            <p className="text-xs leading-relaxed text-[#6B6B66]">{uc.scenario}</p>
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66] mb-2">Evidence Claude needs</p>
                          {evidenceItems.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 rounded-lg border border-[#E8E6E1] bg-white px-3 py-2">
                              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D97757]" />
                              <span className="text-sm text-[#1C1C1C]">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B66] mb-2">Available sources</p>
                          {sources.map((src) => (
                            <div key={src.id} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                              src.type === "connector"
                                ? "border-[#D97757]/30 bg-[#D97757]/[0.04]"
                                : "border-dashed border-[#E8E6E1] bg-[#FAFAF8]"
                            }`}>
                              <span className="text-xl">{src.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1C1C1C]">{src.name}</p>
                                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                                  src.type === "connector" ? "text-[#D97757]" : "text-[#6B6B66]"
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
                          <p className="text-sm text-[#6B6B66]">Click "Run Analysis" in the footer to start.</p>
                        </div>
                      )}

                      {isOutputStep && outputReady && (
                        <div className="space-y-5">
                          <OutputRenderer output={uc.output as any} />

                          {/* Review checklist */}
                          <div className="rounded-2xl border border-[#E8E6E1] bg-white p-4">
                            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97757]">
                              <ShieldCheck className="h-4 w-4" /> What should a marketer double-check?
                            </p>
                            <ul className="space-y-1.5">
                              {uc.reviewChecklist.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-[#6B6B66]">
                                  <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97757]" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Next actions */}
                          <div className="rounded-2xl border border-[#E8E6E1] bg-white p-4">
                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6B9E8A]">Turn this insight into…</p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {uc.nextActions.map((a) => (
                                <div key={a.label} className="rounded-xl border border-[#E8E6E1] bg-[#FAFAF8] p-3">
                                  <p className="text-sm font-semibold text-[#1C1C1C]">{a.label}</p>
                                  <p className="mt-0.5 text-xs text-[#6B6B66]">{a.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Loop tip */}
                          <div className="rounded-2xl border border-[#D97757]/20 bg-[#D97757]/[0.04] p-4">
                            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97757]">
                              <Repeat className="h-4 w-4" /> Make it repeatable
                            </p>
                            <p className="text-sm text-[#1C1C1C]">{uc.loopTip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Why it matters card */}
                  {!isOutputStep && step !== 5 && (
                    <div className="mt-6 rounded-2xl border border-[#F2C88F]/20 bg-[#F2C88F]/[0.04] p-4">
                      <p className="text-xs font-bold text-[#D97757]">Why this step matters</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#6B6B66]">
                        {getWhyItMatters(step)}
                      </p>
                    </div>
                  )}
                </>
              ) : running ? (
                <RunPanel onDone={() => { setRunning(false); setOutputReady(true); }} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Fixed Footer Nav ── */}
      <div className="absolute inset-x-0 bottom-0 flex h-16 shrink-0 items-center justify-between gap-3 border-t border-[#E8E6E1] bg-white px-4 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 0}
          onClick={goPrev}
          className="rounded-full border-[#E8E6E1] text-[#1C1C1C] hover:bg-[#F2F1EE] disabled:opacity-40"
        >
          {step === 0 ? "Exit" : <><ArrowLeft className="h-4 w-4" /> Back</>}
        </Button>

        {/* Progress dots */}
        <div className="hidden items-center gap-1 sm:flex">
          {uc.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < step ? "w-4 bg-[#6B9E8A]" :
                i === step ? "w-6 bg-[#D97757]" :
                "w-1.5 bg-[#E8E6E1]"
              }`}
            />
          ))}
        </div>

        <Button
          size="sm"
          onClick={goNext}
          className="rounded-full bg-[#D97757] px-5 font-semibold text-white hover:bg-[#c06545]"
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
      <div className="aurora-blob right-[8%] top-[15%] h-72 w-72 bg-[#D97757]/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D97757]">The Heart of the Lab</p>
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
