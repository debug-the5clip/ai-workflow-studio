import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { WORKFLOW_NODES, type WorkflowNode } from "@/data/content";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";
import { PlantDecoration, RobotDecoration } from "@/components/lab/Illustrations";

const NODE_COLORS = ["#8B6CFC", "#4A7BF7", "#FF7B72", "#67C587", "#FF9B54", "#8B6CFC", "#4A7BF7", "#FF8FA3", "#67C587", "#FFD84D"];

const STEP_ICONS: Record<string, string> = {
  market: "📊",
  customer: "👥",
  competitor: "🏆",
  insight: "💡",
  decision: "🎯",
  content: "✍️",
  campaign: "📣",
  measure: "📈",
  optimize: "🔄",
};

function WorkflowCard({
  node,
  index,
}: {
  node: WorkflowNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref as any, { once: true, margin: "-40px" });
  const color = NODE_COLORS[index % NODE_COLORS.length];
  const icon = STEP_ICONS[node.id] || "📋";
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        <div
          className="group relative overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04] sm:p-6"
          style={{ borderColor: `${color}20` }}
        >
          <div className="flex items-start gap-4">
            {/* LEFT — Icon container */}
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
              style={{ background: `${color}10` }}
            >
              {icon}
            </div>

            {/* CENTER — Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-6 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ background: color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-base font-bold tracking-tight text-[#2D2D2D]"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {node.label}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#8A8A82]">
                {node.question}
              </p>

              {/* Expandable "How Claude helps here" */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color }}
              >
                {expanded ? "How Claude helps here" : "How Claude helps here"}
                {expanded ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2.5 rounded-2xl border border-[#E8E4DE]/50 bg-[#FFF8F0] p-4">
                      {(["input", "analysis", "insight"] as const).map((k) => (
                        <div key={k}>
                          <p
                            className="text-[10px] font-bold uppercase tracking-widest"
                            style={{ color }}
                          >
                            {k === "input" ? "Input" : k === "analysis" ? "Claude's process" : "Output"}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#5A5A5A]">
                            {node.claudeFlow[k]}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[#8A8A82]">
                      {node.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT — Arrow button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
              style={{
                borderColor: `${color}25`,
                background: `${color}08`,
                color,
              }}
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Connector({ index, isLast }: { index: number; isLast: boolean }) {
  if (isLast) return null;
  const color = NODE_COLORS[index % NODE_COLORS.length];
  const nextColor = NODE_COLORS[(index + 1) % NODE_COLORS.length];

  return (
    <div className="flex flex-col items-center py-1">
      <div
        className="h-3 w-3 rounded-full border-2"
        style={{ borderColor: color, background: `${color}30` }}
      />
      <div
        className="w-px flex-1"
        style={{
          minHeight: "32px",
          background: `linear-gradient(to bottom, ${color}50, ${nextColor}50)`,
        }}
      />
    </div>
  );
}

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative overflow-hidden py-24 sm:py-32">
      <FloatingDecorations preset="workflow" />

      {/* Decorative illustrations — hidden on mobile to avoid crowding */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute bottom-8 left-4 w-20 opacity-30 sm:left-8 sm:w-28 lg:left-16">
          <PlantDecoration />
        </div>
        <div className="absolute bottom-8 right-4 w-16 opacity-30 sm:right-8 sm:w-24 lg:right-16">
          <RobotDecoration />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Squiggle color="#FF7B72" className="opacity-40" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7B72]">
            The Full Picture
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Marketing isn't one task.{" "}
            <span className="text-gradient">It's a system.</span>
          </h2>
          <p className="mt-4 text-[#8A8A82]">
            Click any step to see how Claude helps at each stage of the marketing workflow.
          </p>
        </div>

        {/* ── Centered vertical timeline ── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {WORKFLOW_NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center">
              <WorkflowCard node={node} index={i} />
              <Connector index={i} isLast={i === WORKFLOW_NODES.length - 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
