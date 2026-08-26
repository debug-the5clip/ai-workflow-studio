import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { WORKFLOW_NODES, type WorkflowNode } from "@/data/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function NodeCard({
  node,
  index,
  onOpen,
}: {
  node: WorkflowNode;
  index: number;
  onOpen: (n: WorkflowNode) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref as any, { once: true, margin: "-60px" });
  const isLast = index === WORKFLOW_NODES.length - 1;

  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpen(node)}
        className="group relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-left backdrop-blur transition-all hover:border-cyan-300/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] focus-visible:border-cyan-300/50 focus-visible:outline-none"
      >
        <span className="absolute -top-2.5 left-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-sm font-bold tracking-widest text-foreground group-hover:text-cyan-200">
          {node.label}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{node.question}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan-300/90">
          How Claude helps here <ChevronDown className="h-3 w-3" />
        </span>
      </motion.button>

      {/* animated connector */}
      {!isLast && (
        <div className="relative flex h-12 w-full justify-center">
          <svg width="2" height="48" className="overflow-visible">
            <line
              x1="1" y1="0" x2="1" y2="48"
              stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="4 6"
            />
          </svg>
          <motion.span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px] shadow-cyan-300"
            animate={{ top: ["10%", "85%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: (index % 3) * 0.5 }}
          />
        </div>
      )}
    </div>
  );
}

export function WorkflowSection() {
  const [active, setActive] = useState<WorkflowNode | null>(null);

  return (
    <section id="workflow" className="relative py-24 sm:py-32">
      <div className="aurora-blob right-[10%] top-[20%] h-72 w-72 bg-sky-600/20" />
      <svg width="0" height="0" aria-hidden>
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">The System</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Marketing isn't one task.
            <br />
            <span className="text-gradient">It's a system.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nine connected stages, one loop back to the start. Click any node to see
            exactly how Claude assists that step — inputs in, analysis through,
            insights out.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-x-16">
          {/* two columns on desktop; nodes alternate */}
          <div className="flex flex-col items-center gap-0">
            {WORKFLOW_NODES.filter((_, i) => i % 2 === 0).map((n) => (
              <NodeCard
                key={n.id}
                node={n}
                index={WORKFLOW_NODES.indexOf(n)}
                onOpen={setActive}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-0 lg:pt-16">
            {WORKFLOW_NODES.filter((_, i) => i % 2 === 1).map((n) => (
              <NodeCard
                key={n.id}
                node={n}
                index={WORKFLOW_NODES.indexOf(n)}
                onOpen={setActive}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="glass max-w-lg rounded-3xl border-white/10">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="text-left text-lg font-bold tracking-widest text-cyan-200">
                  {active.label}
                </DialogTitle>
              </DialogHeader>
              <p className="text-base font-medium">{active.question}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{active.explanation}</p>
              <div className="mt-2 space-y-2 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Inside the Claude step
                </p>
                {[
                  { k: "INPUT", v: active.claudeFlow.input },
                  { k: "CLAUDE · ANALYSIS", v: active.claudeFlow.analysis },
                  { k: "INSIGHT", v: active.claudeFlow.insight },
                ].map((r) => (
                  <div key={r.k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                    <span className="w-36 shrink-0 text-[11px] font-bold tracking-wider text-fuchsia-300/90">{r.k}</span>
                    <span className="text-sm text-muted-foreground">{r.v}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
