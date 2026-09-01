import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Check,
  CircleCheck,
  CircleDashed,
  Loader2,
  Play,
  Repeat,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BarChart3,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";
import { RUN_STAGES, generateLiveAnalysis } from "@/lib/ai-engine";
import type { UseCase, UseCaseOutput, LiveAnalysisResult, DemoResult, DemoFinding } from "@/lib/lab-types";
import { COMPANY_CONTEXT, USE_CASES } from "@/data/useCases";
import { OutputRenderer } from "@/components/lab/outputs";

const CATEGORIES = ["All", "Marketing", "Sales", "Product", "Customer", "Research", "Content", "Performance", "Operations"] as const;

const CATEGORY_EMOJI: Record<string, string> = {
  Marketing: "📣",
  Sales: "💰",
  Product: "💡",
  Customer: "👥",
  Research: "🔬",
  Content: "✍️",
  Performance: "📊",
  Operations: "⚙️",
};

const STEP_META = [
  { label: "Business Problem", icon: "❓", color: "#8B6CFC" },
  { label: "Research Question", icon: "🔍", color: "#4A7BF7" },
  { label: "Information Required", icon: "📋", color: "#FF9B54" },
  { label: "Security & Data", icon: "🛡️", color: "#67C587" },
  { label: "Skill", icon: "🧰", color: "#8B6CFC" },
  { label: "Connectors", icon: "🔗", color: "#4A7BF7" },
  { label: "The Prompt", icon: "✍️", color: "#6C5CE7" },
  { label: "Result", icon: "📊", color: "#FF8FA3" },
  { label: "Business Insight", icon: "💡", color: "#67C587" },
  { label: "Human Review", icon: "👤", color: "#FF9B54" },
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

// ── Polished Demo Result View (replaces OutputRenderer in demo mode) ──────────

function FindingCard({ finding, index }: { finding: DemoFinding; index: number }) {
  const confColor = finding.confidence === "high"
    ? "bg-[#67C587]/10 text-[#67C587] border-[#67C587]/20"
    : finding.confidence === "medium"
    ? "bg-[#FFD84D]/15 text-[#B8860B] border-[#FFD84D]/30"
    : "bg-[#E8E4DE] text-[#8A8A82] border-[#E8E4DE]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-[#E8E4DE] bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-[#2D2D2D]">{finding.finding}</p>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${confColor}`}>
          {finding.confidence}
        </span>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-[#F4F6FF] px-3 py-2">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#4A7BF7]">Evidence</p>
          <p className="mt-1 text-xs leading-relaxed text-[#5A5A5A]">{finding.evidence}</p>
        </div>
        <div className="rounded-xl bg-[#FFF8F0] px-3 py-2">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF9B54]">Interpretation</p>
          <p className="mt-1 text-xs leading-relaxed text-[#5A5A5A]">{finding.interpretation}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DemoResultView({ result }: { result: DemoResult }) {
  return (
    <div className="space-y-5">
      {/* Demo Mode badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          DEMO MODE · ILLUSTRATIVE ANALYSIS
        </span>
        <span className="text-[9px] text-[#8A8A82]">Illustrative result from workflow sample evidence</span>
      </div>

      {/* Executive Summary */}
      <div className="rounded-2xl border border-[#6C5CE7]/15 bg-[#6C5CE7]/[0.04] p-5">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">
          <BarChart3 className="h-4 w-4" /> Executive Summary
        </p>
        <p className="text-sm leading-relaxed text-[#2D2D2D]">{result.executiveSummary}</p>
      </div>

      {/* Key Findings */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8A8A82]">Key Findings</p>
        <div className="grid gap-3">
          {result.findings.map((f, i) => (
            <FindingCard key={i} finding={f} index={i} />
          ))}
        </div>
      </div>

      {/* Business Insight */}
      <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-5">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#67C587]">
          <TrendingUp className="h-4 w-4" /> Business Insight
        </p>
        <p className="text-sm leading-relaxed text-[#2D2D2D]">{result.businessInsight}</p>
      </div>

      {/* Recommended Actions */}
      <div className="rounded-2xl border border-[#FF7B72]/15 bg-[#FF7B72]/[0.03] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">Recommended Actions</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {result.recommendedActions.map((action, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-[#E8E4DE] bg-white px-3 py-2.5">
              <span className="mt-0.5 text-[#FF7B72]">→</span>
              <span className="text-xs leading-relaxed text-[#2D2D2D]">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What should a marketer double-check? */}
      <div className="rounded-2xl border border-[#E8E4DE] bg-white p-5">
        <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">
          <ShieldCheck className="h-4 w-4" /> What should a marketer double-check?
        </p>
        <ul className="space-y-1.5">
          {result.doubleCheck.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8A8A82]">
              <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF7B72]" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
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

function StepContent({ uc, step, running, outputReady, liveResult, liveError }: { uc: UseCase; step: number; running: boolean; outputReady: boolean; liveResult: LiveAnalysisResult | null; liveError: string | null }) {
  const evidenceItems = uc.evidenceNeeded;
  const meta = STEP_META[step] || STEP_META[0];

  return (
    <div className="space-y-4">
      {/* Source badge — contextual per step */}
      {step <= 6 && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" /> Workflow Framework · Structured Demo
          </span>
        </div>
      )}

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

      {/* ═══ STEP 0: Business Problem ═══ */}
      {step === 0 && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">The user's problem</p>
            <p className="text-sm leading-relaxed text-[#2D2D2D]">{uc.scenario}</p>
          </div>
          <div className="rounded-2xl border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.04] p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#6C5CE7]">Business question</p>
            <p className="text-sm font-semibold text-[#2D2D2D]">{uc.goal}</p>
          </div>
        </div>
      )}

      {/* ═══ STEP 1: Research Question ═══ */}
      {step === 1 && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#4A7BF7]/20 bg-[#4A7BF7]/[0.04] p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4A7BF7]">AI converts your problem into a research question</p>
            <p className="text-sm font-semibold text-[#2D2D2D]">{uc.goal}</p>
          </div>
          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Why this matters</p>
            <p className="text-xs leading-relaxed text-[#8A8A82]">A vague question produces vague research. The workflow first defines exactly what needs to be discovered.</p>
          </div>
        </div>
      )}

      {/* ═══ STEP 2: Information Required ═══ */}
      {step === 2 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82] mb-2">Evidence Claude needs</p>
          {evidenceItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl border border-[#E8E4DE] bg-white px-3 py-2.5">
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#6C5CE7]" />
              <span className="text-sm text-[#2D2D2D]">{item}</span>
            </div>
          ))}
          <div className="rounded-2xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.04] p-3 mt-2">
            <p className="text-xs font-bold text-[#FF9B54]">Before asking Claude anything, decide what evidence would actually support the answer.</p>
          </div>
        </div>
      )}

      {/* ═══ STEP 3: Security & Data ═══ */}
      {step === 3 && (
        <div className="space-y-4">
          {uc.securityClassification ? (
            <>
              <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#67C587]">Data classification</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    uc.securityClassification.level === "PUBLIC" ? "bg-blue-100 text-blue-700" :
                    uc.securityClassification.level === "INTERNAL" ? "bg-amber-100 text-amber-700" :
                    uc.securityClassification.level === "CONFIDENTIAL" ? "bg-red-100 text-red-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>
                    {uc.securityClassification.level}
                  </span>
                  <span className="text-xs text-[#8A8A82]">{uc.securityClassification.explanation}</span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#67C587]/20 bg-white p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#67C587]">Data needed</p>
                  <ul className="space-y-1">
                    {uc.securityClassification.dataNeeded.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[#5A5A5A]">
                        <span className="mt-0.5 text-[#67C587]">✓</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#FF7B72]/15 bg-white p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#FF7B72]">Not needed</p>
                  <ul className="space-y-1">
                    {uc.securityClassification.dataNotNeeded.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[#8A8A82]">
                        <span className="mt-0.5 text-[#FF7B72]">✗</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">AI guardrails</p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.securityClassification.guardrails.map((g) => (
                    <span key={g} className="rounded-full border border-[#E8E4DE] bg-[#FFF8F0] px-2.5 py-1 text-[10px] font-medium text-[#5A5A5A]">{g}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4 text-center">
              <p className="text-sm text-[#8A8A82]">Security classification not configured for this use case.</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP 4: Skill ═══ */}
      {step === 4 && (
        <div className="space-y-4">
          <SkillVisualInline />
          {uc.skillDetails && (
            <div className="rounded-2xl border border-[#8B6CFC]/20 bg-[#8B6CFC]/[0.04] p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#8B6CFC]">Why this skill?</p>
              <p className="text-sm leading-relaxed text-[#2D2D2D]">{uc.skillDetails.whyRecommended}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-white border border-[#E8E4DE] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Purpose</p>
                  <p className="text-xs text-[#5A5A5A]">{uc.skillDetails.purpose}</p>
                </div>
                <div className="rounded-xl bg-white border border-[#E8E4DE] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Outputs</p>
                  <p className="text-xs text-[#5A5A5A]">{uc.skillDetails.outputs}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP 5: Connectors ═══ */}
      {step === 5 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82] mb-2">Recommended connectors for this workflow</p>
          {uc.connectorDetails && uc.connectorDetails.length > 0 ? (
            uc.connectorDetails.map((conn) => (
              <div key={conn.name} className="rounded-2xl border border-[#4A7BF7]/15 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{conn.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2D2D2D]">{conn.name}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      conn.status === "connected-simulated" || conn.status === "connected" ? "bg-[#67C587]/10 text-[#67C587]" :
                      conn.status === "available" ? "bg-amber-100 text-amber-700" :
                      "bg-[#E8E4DE] text-[#8A8A82]"
                    }`}>
                      {conn.status === "connected-simulated" ? "CONNECTED · DEMO" :
                       conn.status === "connected" ? "CONNECTED" :
                       conn.status === "available" ? "AVAILABLE" : "NOT CONNECTED"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#FFF8F0] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">What it provides</p>
                    <p className="text-xs text-[#5A5A5A]">{conn.whatItProvides}</p>
                  </div>
                  <div className="rounded-xl bg-[#4A7BF7]/[0.04] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A7BF7]">Why recommended</p>
                    <p className="text-xs text-[#5A5A5A]">{conn.whyRecommended}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4 text-center">
              <p className="text-sm text-[#8A8A82]">No specific connectors configured for this workflow.</p>
            </div>
          )}
          <div className="rounded-2xl border border-[#FFD84D]/20 bg-[#FFD84D]/[0.04] p-3">
            <p className="text-xs font-bold text-[#FF9B54]">Connector = WHERE information comes from. Skill = HOW Claude processes it. Prompt = WHAT we ask Claude to do.</p>
          </div>
        </div>
      )}

      {/* ═══ STEP 6: Prompt ═══ */}
      {step === 6 && <PromptAnatomy uc={uc} />}

      {/* ═══ STEP 7: Result ═══ */}
      {step === 7 && !running && !outputReady && (
        <div className="text-center py-4">
          <p className="text-sm text-[#8A8A82]">Click "Run Analysis" in the footer to start.</p>
        </div>
      )}

      {step === 7 && running && (
        <RunPanel onDone={() => {}} />
      )}

      {step === 7 && outputReady && (
        <div className="space-y-5">
          {/* Live Claude output */}
          {liveResult?.source === "live" && (
            <>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
                  <Sparkles className="h-3 w-3" /> Live Claude Output · {liveResult.model}
                </span>
                {liveResult.inputTokens && liveResult.outputTokens && (
                  <span className="text-[9px] text-[#8A8A82]">{liveResult.inputTokens + liveResult.outputTokens} tokens</span>
                )}
              </div>
              <OutputRenderer output={liveResult.output as UseCaseOutput} />
            </>
          )}

          {/* Demo / fallback result — always show polished demo view */}
          {(!liveResult || liveResult.source !== "live") && (
            uc.demoResult
              ? <DemoResultView result={uc.demoResult} />
              : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                      DEMO MODE · ILLUSTRATIVE ANALYSIS
                    </span>
                    <span className="text-[9px] text-[#8A8A82]">Illustrative result from workflow sample evidence</span>
                  </div>
                  <div className="rounded-2xl border border-[#6C5CE7]/15 bg-[#6C5CE7]/[0.04] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6C5CE7]">Executive Summary</p>
                    <p className="text-sm leading-relaxed text-[#2D2D2D]">{uc.outputDescription}</p>
                  </div>
                  {uc.businessValue && (
                    <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#67C587]">Business Insight</p>
                      <p className="text-sm leading-relaxed text-[#2D2D2D]">{uc.businessValue.businessInsight}</p>
                    </div>
                  )}
                  {uc.businessValue && uc.businessValue.keyFindings.length > 0 && (
                    <div className="rounded-2xl border border-[#E8E4DE] bg-white p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#8A8A82]">Key Findings</p>
                      <ul className="space-y-1.5">
                        {uc.businessValue.keyFindings.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                            <span className="mt-0.5 text-[#67C587]">→</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="rounded-2xl border border-[#E8E4DE] bg-white p-5">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">
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
              )
          )}
        </div>
      )}

      {/* ═══ STEP 8: Business Insight ═══ */}
      {step === 8 && (
        <div className="space-y-4">
          {/* Source badge */}
          {liveResult?.source === "live" && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
                <Sparkles className="h-3 w-3" /> Derived from live Claude analysis
              </span>
            </div>
          )}
          <div className="rounded-2xl border border-[#67C587]/20 bg-[#67C587]/[0.04] p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#67C587]">Business insight</p>
            <p className="text-sm leading-relaxed text-[#2D2D2D]">{liveResult?.businessInsight || uc.businessValue?.businessInsight || uc.outputDescription}</p>
          </div>
          <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8A8A82]">Key findings</p>
            <ul className="space-y-1.5">
              {(liveResult?.keyFindings || uc.businessValue?.keyFindings || []).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5A5A5A]">
                  <span className="mt-0.5 text-[#67C587]">→</span> {f}
                </li>
              ))}
            </ul>
          </div>
          {uc.businessValue && !liveResult && (
            <div className="rounded-2xl border border-[#4A7BF7]/15 bg-[#4A7BF7]/[0.04] p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4A7BF7]">Business value</p>
              <p className="text-xs leading-relaxed text-[#5A5A5A]">{uc.businessValue.valueStatement}</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP 9: Human Review ═══ */}
      {step === 9 && (
        <div className="space-y-4">
          {uc.humanReview ? (
            <>
              <div className="rounded-2xl border border-[#FF9B54]/20 bg-[#FF9B54]/[0.04] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF9B54]">Human review required</p>
                <p className="text-xs leading-relaxed text-[#8A8A82]">{uc.humanReview.explanation}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#67C587]/15 bg-white p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#67C587]">AI can</p>
                  <ul className="space-y-1">
                    {uc.humanReview.aiCanDo.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-xs text-[#5A5A5A]">
                        <span className="mt-0.5 text-[#67C587]">✓</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#FF7B72]/15 bg-white p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#FF7B72]">Human approval before</p>
                  <ul className="space-y-1">
                    {uc.humanReview.humanApprovalFor.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-[#5A5A5A]">
                        <span className="mt-0.5 text-[#FF7B72]">⚠</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4 text-center">
                <p className="text-xs text-[#8A8A82]">AI analysis → Recommendation → Human review → Approve → Action</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[#E8E4DE] bg-white p-4 text-center">
              <p className="text-sm text-[#8A8A82]">Human review configuration not set for this workflow.</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ STEP 10: Action ═══ */}
      {step === 10 && (
        <div className="space-y-4">
          {/* Source badge */}
          {liveResult?.source === "live" && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
                <Sparkles className="h-3 w-3" /> Actions derived from live analysis
              </span>
            </div>
          )}
          <div className="rounded-2xl border border-[#FF7B72]/20 bg-[#FF7B72]/[0.04] p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF7B72]">Turn this insight into…</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(liveResult?.recommendedActions || uc.nextActions).map((a, i) => (
                <div key={i} className="rounded-xl border border-[#E8E4DE] bg-white p-3">
                  <p className="text-sm font-semibold text-[#2D2D2D]">{a.label}</p>
                  <p className="mt-0.5 text-xs text-[#8A8A82]">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
          {uc.businessValue && !liveResult && (
            <div className="rounded-2xl border border-[#67C587]/15 bg-[#67C587]/[0.04] p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#67C587]">Recommended action</p>
              <p className="text-sm text-[#2D2D2D]">{uc.businessValue.recommendedAction}</p>
            </div>
          )}
          <div className="rounded-2xl border border-[#FF9B54]/20 bg-[#FF9B54]/[0.04] p-4">
            <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF9B54]">
              <Repeat className="h-4 w-4" /> Make it repeatable
            </p>
            <p className="text-sm text-[#2D2D2D]">{uc.loopTip}</p>
          </div>

          {/* What would you like to do next? */}
          <div className="rounded-2xl border border-[#6C5CE7]/15 bg-[#6C5CE7]/[0.04] p-5">
            <p className="mb-3 text-sm font-bold text-[#2D2D2D]">What would you like to do next?</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {uc.nextActions.map((a) => (
                <button
                  key={a.label}
                  className="rounded-xl border border-[#E8E4DE] bg-white p-3 text-left transition-all hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/[0.02] hover:shadow-sm"
                  onClick={() => {
                    document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <p className="text-sm font-semibold text-[#6C5CE7]">{a.label}</p>
                  <p className="mt-0.5 text-xs text-[#8A8A82]">{a.description}</p>
                </button>
              ))}
              <button
                className="rounded-xl border border-[#E8E4DE] bg-white p-3 text-left transition-all hover:border-[#67C587]/30 hover:bg-[#67C587]/[0.02] hover:shadow-sm"
                onClick={() => {
                  document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <p className="text-sm font-semibold text-[#67C587]">Run Another Analysis</p>
                <p className="mt-0.5 text-xs text-[#8A8A82]">Explore a different business problem</p>
              </button>
              <button
                className="rounded-xl border border-[#E8E4DE] bg-white p-3 text-left transition-all hover:border-[#FF9B54]/30 hover:bg-[#FF9B54]/[0.02] hover:shadow-sm"
                onClick={() => {
                  document.querySelector("#blocks")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <p className="text-sm font-semibold text-[#FF9B54]">Learn How This Works</p>
                <p className="mt-0.5 text-xs text-[#8A8A82]">Understand Skills, Connectors, and Loops</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Why it matters — shown for steps that don't have specific panels */}
      {step !== 7 && step !== 10 && (
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
  const [liveResult, setLiveResult] = useState<LiveAnalysisResult | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { completeUseCase } = useLab();

  // Lock body scroll while wizard is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const total = uc.steps.length;
  const isOutputStep = step === 7; // Result step — where RunPanel + live analysis happens

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
    <div
      className="flex flex-col"
      style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "#FAF9F6", isolation: "isolate" }}
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
                  <RunPanel onDone={async () => {
                    setRunning(false);
                    // Attempt live Claude analysis
                    try {
                      const result = await generateLiveAnalysis({
                        useCaseId: uc.id,
                        useCaseTitle: uc.title,
                        useCaseDescription: uc.scenario,
                        prompt: uc.prompt,
                        visualOutputType: uc.visualOutputType,
                        evidenceNeeded: uc.evidenceNeeded,
                      });
                      if (result) {
                        setLiveResult(result);
                        setLiveError(null);
                      } else {
                        setLiveResult(null);
                        setLiveError("Live generation unavailable — showing illustrative output.");
                      }
                    } catch {
                      setLiveResult(null);
                      setLiveError("Live generation unavailable — showing illustrative output.");
                    }
                    setOutputReady(true);
                  }} />
                ) : (
                  <StepContent uc={uc} step={step} running={running} outputReady={outputReady} liveResult={liveResult} liveError={liveError} />
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
    </div>
  );
}

// ── Helper text for each step ───────────────────────────────────────────────────

function getDefaultStepTitle(step: number): string {
  const titles = [
    "Define the Business Problem",
    "Convert to a Research Question",
    "Identify the Information Required",
    "Security & Data Classification",
    "Choose the Right Skill",
    "Choose the Right Connectors",
    "Build the Prompt",
    "Run & Review the Result",
    "Synthesize the Business Insight",
    "Human Review",
    "Take Action & Make It Repeatable",
  ];
  return titles[step] || "Step";
}

function getDefaultExplanation(step: number): string {
  const explanations = [
    "Claude works best when it knows the decision behind the question — not just the topic. A vague business problem produces vague analysis. A specific problem produces actionable insight.",
    "AI converts your broad business request into a specific research question that can actually be investigated. The quality of the question determines the quality of the answer.",
    "Before asking Claude anything, decide what evidence would actually support the answer. Good inputs are what separate a confident-sounding guess from a grounded analysis.",
    "Every workflow should consider what data is needed, what's public vs internal, and what guardrails apply. This prevents accidental data exposure and ensures responsible AI use.",
    "Not every task needs the same kind of setup. Some questions just need one good instruction. Others deserve a repeatable method. The skill chosen determines the analytical approach.",
    "Connectors define WHERE information comes from. Some are public (web search), some are internal (Google Drive, Notion). The workflow recommends the right connectors for this specific task.",
    "The best marketing prompts give Claude a role, context, a clear task, source instructions, and output format. This is the instruction that drives the analysis.",
    "Claude reads what's available, organizes it, and drafts a structured answer. The result is illustrative in demo mode — clearly labeled as sample output for learning purposes.",
    "Raw analysis becomes business insight when you synthesize the evidence into a clear statement about what it means and why it matters for the business.",
    "AI provides the analysis; humans decide what to do with it. This step identifies what requires human judgment before any action is taken.",
    "An insight only has value once it changes a decision. Every workflow ends by connecting the analysis to a specific next business action.",
  ];
  return explanations[step] || "";
}

function getWhyItMatters(step: number): string {
  const reasons = [
    "Framing the problem properly prevents Claude from giving generic marketing-speak instead of actionable analysis.",
    "Converting a business problem into a research question ensures the analysis is focused and investigable.",
    "Without deciding on evidence first, you risk asking Claude for an opinion instead of an analysis grounded in data.",
    "Understanding data classification prevents accidental exposure of confidential information and ensures responsible AI use.",
    "Choosing the right skill determines the analytical method: research, analysis, strategy, or content creation.",
    "Knowing which connectors are recommended — and why — ensures the analysis has access to the right information sources.",
    "A well-structured prompt is the difference between a useless paragraph and a repeatable, reliable output.",
    "This is where Claude does the analytical heavy lifting. In demo mode, results are illustrative; with real connectors, they'd use your actual data.",
    "Visual structures make findings actionable: you can see the shape of the insight instead of scrolling through text.",
    "Human review is where brand knowledge, business context, and judgment get applied. This step is never skippable for consequential decisions.",
    "The gap between insight and impact is action. Every finding should connect to a specific next business decision.",
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

      {/* Wizard portalled to body so it escapes all stacking contexts */}
      {active && createPortal(
        <Wizard uc={active} onClose={() => setActive(null)} />,
        document.body
      )}
    </section>
  );
}
