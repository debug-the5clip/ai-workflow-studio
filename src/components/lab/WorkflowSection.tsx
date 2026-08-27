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
        className="group relative w-full max-w-md rounded-2xl border border-[#E2E0DB] bg-white/80 p-5 text-left shadow-sm shadow-black/[0.03] backdrop-blur transition-all hover:border-[#D97757]/40 hover:shadow-lg hover:shadow-[#D97757]/8 focus-visible:border-[#D97757]/50 focus-visible:outline-none"
      >
        <span className="absolute -top-2.5 left-5 rounded-full bg-[#D97757] px-2 py-0.5 text-[10px] font-bold text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-sm font-bold tracking-widest text-[#4A4A46] group-hover:text-[#D97757]">
          {node.label}
        </p>
        <p className="mt-1.5 text-sm text-[#6B6B66]">{node.question}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#D97757]">
          How Claude helps here <ChevronDown className="h-3 w-3" />
        </span>
      </motion.button>

      {/* animated connector */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="h-10 w-px origin-top bg-gradient-to-b from-[#D97757]/40 to-transparent"
        />
      )}
    </div>
  );
}

export function WorkflowSection() {
  const [open, setOpen] = useState<WorkflowNode | null>(null);

  return (
    <section id="workflow" className="relative py-24 sm:py-32">
      <div className="aurora-blob left-[5%] top-[30%] h-64 w-64 bg-[#D97757]/8" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D97757]">The Full Picture</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#1C1C1C] sm:text-5xl">
            Marketing isn't one task.{" "}
            <span className="text-gradient">It's a system.</span>
          </h2>
          <p className="mt-4 text-[#6B6B66]">
            Click any node to see how Claude helps at each stage of the marketing workflow.
          </p>
        </div>

        <div className="mx-auto flex max-w-md flex-col items-center gap-0">
          {WORKFLOW_NODES.map((node, i) => (
            <NodeCard key={node.id} node={node} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg rounded-3xl border-[#E2E0DB] bg-white p-6 shadow-2xl shadow-black/10">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#1C1C1C]">{open.label}</DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-sm text-[#6B6B66]">{open.explanation}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(["input", "analysis", "insight"] as const).map((k) => (
                  <div key={k} className="rounded-xl border border-[#E2E0DB]/60 bg-[#F5F4F0]/60 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D97757]">{k}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#6B6B66]">{open.claudeFlow[k]}</p>
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
