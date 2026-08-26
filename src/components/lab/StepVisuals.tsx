import { motion } from "framer-motion";

// ─── SVG illustrations for each step ──────────────────────────────────────────
// Original, friendly SVG illustrations that match each workflow stage.

function ResearchSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <rect x="10" y="10" width="100" height="60" rx="8" fill="url(#rg1)" opacity="0.15" />
      <circle cx="50" cy="40" r="18" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />
      <circle cx="50" cy="40" r="10" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
      <line x1="63" y1="53" x2="80" y2="70" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
      <text x="50" y="43" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold">?</text>
      <circle cx="85" cy="25" r="4" fill="#a78bfa" opacity="0.6" />
      <circle cx="90" cy="35" r="3" fill="#f472b6" opacity="0.4" />
      <circle cx="20" cy="55" r="3.5" fill="#34d399" opacity="0.5" />
      <defs><radialGradient id="rg1" cx="50%" cy="50%"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#a78bfa" /></radialGradient></defs>
    </svg>
  );
}

function InfoGatherSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <rect x="15" y="12" width="36" height="28" rx="4" stroke="#22d3ee" strokeWidth="1.2" opacity="0.6" />
      <line x1="20" y1="22" x2="44" y2="22" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="28" x2="40" y2="28" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="34" x2="38" y2="34" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
      <rect x="58" y="12" width="46" height="28" rx="4" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
      <line x1="63" y1="22" x2="98" y2="22" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
      <line x1="63" y1="28" x2="95" y2="28" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      <line x1="63" y1="34" x2="90" y2="34" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      <rect x="25" y="48" width="70" height="22" rx="4" stroke="#34d399" strokeWidth="1.2" opacity="0.6" />
      <line x1="30" y1="56" x2="88" y2="56" stroke="#34d399" strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="62" x2="80" y2="62" stroke="#34d399" strokeWidth="1" opacity="0.3" />
      <path d="M33 40 L60 48" stroke="#67e8f9" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <path d="M81 40 L60 48" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function ConnectorSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <circle cx="20" cy="25" r="10" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />
      <text x="20" y="28" textAnchor="middle" fill="#67e8f9" fontSize="8" fontWeight="bold">CSV</text>
      <circle cx="20" cy="55" r="10" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" />
      <text x="20" y="58" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="bold">PDF</text>
      <circle cx="60" cy="40" r="14" fill="url(#cn1)" opacity="0.2" />
      <circle cx="60" cy="40" r="14" stroke="#f472b6" strokeWidth="1.5" opacity="0.6" />
      <text x="60" y="43" textAnchor="middle" fill="#f9a8d4" fontSize="7" fontWeight="bold">CLAUDE</text>
      <circle cx="100" cy="40" r="10" stroke="#34d399" strokeWidth="1.5" opacity="0.5" />
      <text x="100" y="43" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontWeight="bold">OUT</text>
      <path d="M30 25 L46 40" stroke="#67e8f9" strokeWidth="1.2" opacity="0.5" />
      <path d="M30 55 L46 40" stroke="#c4b5fd" strokeWidth="1.2" opacity="0.5" />
      <path d="M74 40 L90 40" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.5" />
      <defs><radialGradient id="cn1" cx="50%" cy="50%"><stop stopColor="#f472b6" /><stop offset="1" stopColor="#22d3ee" /></radialGradient></defs>
    </svg>
  );
}

function SkillSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      {["INPUT", "PROCESS", "OUTPUT"].map((label, i) => (
        <g key={label}>
          <rect x={8 + i * 38} y="10" width="32" height="20" rx="5" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" fill={i === 1 ? "rgba(34,211,238,0.08)" : "none"} />
          <text x={24 + i * 38} y="23" textAnchor="middle" fill="#67e8f9" fontSize="6.5" fontWeight="bold">{label}</text>
          {i < 2 && <path d={`M${40 + i * 38} 20 L${46 + i * 38} 20`} stroke="#f472b6" strokeWidth="1.2" markerEnd="url(#arrowPink)" />}
        </g>
      ))}
      <rect x="15" y="40" width="90" height="30" rx="6" stroke="#a78bfa" strokeWidth="1.2" opacity="0.5" />
      <text x="60" y="50" textAnchor="middle" fill="#c4b5fd" fontSize="6.5" fontWeight="bold">REUSABLE METHOD</text>
      <line x1="25" y1="56" x2="95" y2="56" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
      <text x="60" y="64" textAnchor="middle" fill="#c4b5fd" fontSize="5.5" opacity="0.7">Collect → Categorize → Compare → Insight</text>
      <defs><marker id="arrowPink" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#f472b6" opacity="0.6" /></marker></defs>
    </svg>
  );
}

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
      <path d="M68 35 L75 35" stroke="#67e8f9" strokeWidth="1" opacity="0.5" markerEnd="url(#arrowCyan)" />
      <defs><marker id="arrowCyan" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#22d3ee" opacity="0.6" /></marker></defs>
    </svg>
  );
}

function RunSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <circle cx="60" cy="40" r="28" stroke="url(#runGrad)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="60" cy="40" r="18" stroke="url(#runGrad)" strokeWidth="1" opacity="0.3" />
      <polygon points="52,28 75,40 52,52" fill="#22d3ee" opacity="0.6" />
      <text x="60" y="72" textAnchor="middle" fill="#67e8f9" fontSize="7" fontWeight="bold" opacity="0.8">RUNNING...</text>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={60 + 28 * Math.cos((i * Math.PI) / 2)} cy={40 + 28 * Math.sin((i * Math.PI) / 2)} r="3" fill={["#22d3ee", "#a78bfa", "#f472b6", "#34d399"][i]} opacity="0.5" />
      ))}
      <defs><linearGradient id="runGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#a78bfa" /></linearGradient></defs>
    </svg>
  );
}

function OutputSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="44" height="64" rx="6" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" />
      <text x="30" y="20" textAnchor="middle" fill="#67e8f9" fontSize="6" fontWeight="bold">DASHBOARD</text>
      <rect x="14" y="26" width="32" height="12" rx="3" fill="#22d3ee" opacity="0.1" />
      <rect x="14" y="42" width="14" height="8" rx="2" fill="#34d399" opacity="0.15" />
      <rect x="32" y="42" width="14" height="8" rx="2" fill="#f472b6" opacity="0.15" />
      <rect x="14" y="54" width="32" height="14" rx="3" fill="#a78bfa" opacity="0.1" />
      <rect x="62" y="8" width="50" height="30" rx="6" stroke="#a78bfa" strokeWidth="1.2" opacity="0.5" />
      <text x="87" y="20" textAnchor="middle" fill="#c4b5fd" fontSize="6" fontWeight="bold">INSIGHTS</text>
      <line x1="68" y1="26" x2="106" y2="26" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
      <line x1="68" y1="32" x2="98" y2="32" stroke="#a78bfa" strokeWidth="0.8" opacity="0.2" />
      <rect x="62" y="44" width="50" height="28" rx="6" stroke="#34d399" strokeWidth="1.2" opacity="0.5" />
      <text x="87" y="56" textAnchor="middle" fill="#6ee7b7" fontSize="6" fontWeight="bold">ACTIONS</text>
      <rect x="68" y="60" width="38" height="3" rx="1.5" fill="#34d399" opacity="0.2" />
      <rect x="68" y="66" width="30" height="3" rx="1.5" fill="#34d399" opacity="0.15" />
    </svg>
  );
}

function ReviewSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <rect x="15" y="10" width="90" height="60" rx="6" stroke="#a78bfa" strokeWidth="1.2" opacity="0.4" />
      <text x="60" y="22" textAnchor="middle" fill="#c4b5fd" fontSize="6.5" fontWeight="bold">REVIEW CHECKLIST</text>
      {["Fact-check quotes", "Confirm data scope", "Validate interpretations"].map((t, i) => (
        <g key={i}>
          <rect x="22" y={28 + i * 14} width="8" height="8" rx="2" stroke="#34d399" strokeWidth="1" opacity="0.6" />
          <text x="26" y={35 + i * 14} textAnchor="middle" fill="#6ee7b7" fontSize="7">✓</text>
          <text x="36" y={35 + i * 14} fill="#94a3b8" fontSize="6.5">{t}</text>
        </g>
      ))}
      <circle cx="100" cy="20" r="8" stroke="#f472b6" strokeWidth="1" opacity="0.4" />
      <text x="100" y="23" textAnchor="middle" fill="#f9a8d4" fontSize="6" fontWeight="bold">?</text>
    </svg>
  );
}

function ActionSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <circle cx="25" cy="40" r="16" stroke="#22d3ee" strokeWidth="1.2" opacity="0.5" />
      <text x="25" y="43" textAnchor="middle" fill="#67e8f9" fontSize="6" fontWeight="bold">INSIGHT</text>
      <path d="M41 40 L55 40" stroke="#67e8f9" strokeWidth="1.5" opacity="0.5" markerEnd="url(#actArr)" />
      <rect x="55" y="12" width="22" height="16" rx="4" stroke="#34d399" strokeWidth="1" opacity="0.5" />
      <text x="66" y="22" textAnchor="middle" fill="#6ee7b7" fontSize="5" fontWeight="bold">AD</text>
      <rect x="55" y="32" width="22" height="16" rx="4" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
      <text x="66" y="42" textAnchor="middle" fill="#c4b5fd" fontSize="5" fontWeight="bold">EMAIL</text>
      <rect x="55" y="52" width="22" height="16" rx="4" stroke="#f472b6" strokeWidth="1" opacity="0.5" />
      <text x="66" y="62" textAnchor="middle" fill="#f9a8d4" fontSize="5" fontWeight="bold">POST</text>
      <rect x="90" y="25" width="22" height="30" rx="4" stroke="#34d399" strokeWidth="1.2" opacity="0.5" />
      <text x="101" y="38" textAnchor="middle" fill="#6ee7b7" fontSize="5" fontWeight="bold">NEXT</text>
      <text x="101" y="46" textAnchor="middle" fill="#6ee7b7" fontSize="5" fontWeight="bold">STEP</text>
      <path d="M77 40 L90 40" stroke="#6ee7b7" strokeWidth="1" opacity="0.5" markerEnd="url(#actArr2)" />
      <defs>
        <marker id="actArr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#22d3ee" opacity="0.6" /></marker>
        <marker id="actArr2" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#34d399" opacity="0.6" /></marker>
      </defs>
    </svg>
  );
}

function LoopSvg() {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="h-full w-full">
      <circle cx="60" cy="40" r="26" stroke="url(#loopGr)" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.4" />
      {["RESEARCH", "INSIGHT", "ACTION", "MEASURE", "LEARN"].map((label, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const x = 60 + 26 * Math.cos(angle);
        const y = 40 + 26 * Math.sin(angle);
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="10" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
            <text x={x} y={y + 2} textAnchor="middle" fill="#67e8f9" fontSize="4.5" fontWeight="bold">{label}</text>
          </g>
        );
      })}
      <polygon points="56,24 64,24 60,18" fill="#f472b6" opacity="0.6" />
      <defs><linearGradient id="loopGr" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#a78bfa" /></linearGradient></defs>
    </svg>
  );
}

// ─── Step configuration ────────────────────────────────────────────────────────

export interface StepVisualConfig {
  icon: React.ComponentType;
  color: string;
  bgGlow: string;
  tip: string;
  contextExample: string;
}

const STEP_CONFIGS: StepVisualConfig[] = [
  {
    icon: ResearchSvg,
    color: "text-cyan-300",
    bgGlow: "from-cyan-300/[0.08] to-transparent",
    tip: "Start with a clear business question — vague goals produce vague outputs.",
    contextExample: "For a luggage brand, this might be: 'Which traveler segments are we underserving with our current product line?'",
  },
  {
    icon: InfoGatherSvg,
    color: "text-sky-300",
    bgGlow: "from-sky-300/[0.08] to-transparent",
    tip: "The more specific you are about your data's shape, the better Claude navigates it.",
    contextExample: "Review exports with ratings, dates, and text — plus anonymized support tickets tagged by category.",
  },
  {
    icon: ConnectorSvg,
    color: "text-indigo-300",
    bgGlow: "from-indigo-300/[0.08] to-transparent",
    tip: "Connectors define WHERE data comes from — not what Claude does with it.",
    contextExample: "Upload review CSVs and support-ticket exports. Public competitor pages you paste in yourself.",
  },
  {
    icon: SkillSvg,
    color: "text-violet-300",
    bgGlow: "from-violet-300/[0.08] to-transparent",
    tip: "A Skill is a reusable METHOD — same stages, same quality bar, every single week.",
    contextExample: "Collect reviews → cluster themes → count mentions → attach sentiment → rank pain points → propose opportunities.",
  },
  {
    icon: PromptSvg,
    color: "text-fuchsia-300",
    bgGlow: "from-fuchsia-300/[0.08] to-transparent",
    tip: "A strong prompt = context + objective + input + task + constraints + output format.",
    contextExample: "The full structured prompt below includes every component. Copy it, swap in your own context, and reuse.",
  },
  {
    icon: RunSvg,
    color: "text-rose-300",
    bgGlow: "from-rose-300/[0.08] to-transparent",
    tip: "Claude processes the data through each stage of your skill, with your constraints enforced.",
    contextExample: "Reading inputs → applying skill stages → cross-checking evidence → quality check → formatting output.",
  },
  {
    icon: OutputSvg,
    color: "text-emerald-300",
    bgGlow: "from-emerald-300/[0.08] to-transparent",
    tip: "Visual outputs beat raw text — themed cards, matrices, and dashboards you can scan in seconds.",
    contextExample: "Theme clusters with mention counts, sentiment bubbles, pain-point rankings, and opportunity cards.",
  },
  {
    icon: ReviewSvg,
    color: "text-amber-300",
    bgGlow: "from-amber-300/[0.08] to-transparent",
    tip: "AI drafts, humans verify. Spot-check facts before they inform real decisions.",
    contextExample: "Check that quotes are real, confirm theme counts against raw data, and validate assumptions.",
  },
  {
    icon: ActionSvg,
    color: "text-cyan-300",
    bgGlow: "from-cyan-300/[0.08] to-transparent",
    tip: "Every insight should lead to a concrete next step — otherwise it's just reading, not marketing.",
    contextExample: "Feed top pain points into ad messaging, or turn a gap into a Product Opportunity scorecard.",
  },
  {
    icon: LoopSvg,
    color: "text-violet-300",
    bgGlow: "from-violet-300/[0.08] to-transparent",
    tip: "One-off insights are useful. Loops make them compound over time.",
    contextExample: "Re-run monthly on fresh data. Track whether each theme grows or shrinks — that's where real intelligence lives.",
  },
];

export function getStepConfig(stepIndex: number): StepVisualConfig {
  return STEP_CONFIGS[stepIndex] ?? STEP_CONFIGS[0];
}

// ─── Visual component ─────────────────────────────────────────────────────────

export function StepVisual({ stepIndex, useCaseName }: { stepIndex: number; useCaseName: string }) {
  const cfg = getStepConfig(stepIndex);
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mt-4 space-y-3"
    >
      {/* Illustration + tip */}
      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
        <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${cfg.bgGlow} p-3`}>
          <div className="aspect-[3/2]">
            <Icon />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className={`h-1.5 w-1.5 rounded-full bg-current ${cfg.color}`} />
            Why this step matters
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{cfg.tip}</p>
        </div>
      </div>

      {/* Context example */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          <span className="inline-block h-1 w-1 rounded-full bg-current" />
          Example · {useCaseName}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{cfg.contextExample}</p>
      </div>
    </motion.div>
  );
}

// ─── Mini pipeline bar ────────────────────────────────────────────────────────

const STAGE_LABELS = ["Research", "Research", "Research", "Research", "Create", "Create", "Create", "Review", "Action", "Loop"];
const STAGE_COLORS: Record<string, string> = {
  Research: "from-cyan-400 to-sky-400",
  Create: "from-violet-400 to-fuchsia-400",
  Review: "from-amber-400 to-yellow-400",
  Action: "from-emerald-400 to-teal-400",
  Loop: "from-fuchsia-400 to-pink-400",
};

export function StepPipeline({ currentStep, total }: { currentStep: number; total: number }) {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const stage = STAGE_LABELS[i] ?? "Research";
        const isPast = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={i} className="group relative flex-1">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isPast
                  ? `bg-gradient-to-r ${STAGE_COLORS[stage]}`
                  : isCurrent
                    ? `bg-gradient-to-r ${STAGE_COLORS[stage]} animate-pulse`
                    : "bg-white/10"
              }`}
            />
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
              {stage}
            </span>
          </div>
        );
      })}
    </div>
  );
}
