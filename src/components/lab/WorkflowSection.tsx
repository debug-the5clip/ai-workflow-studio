import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WORKFLOW_NODES, type WorkflowNode } from "@/data/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";

const NODE_COLORS = ["#4A7BF7", "#8B6CFC", "#FF7B72", "#67C587", "#FF9B54", "#FFD84D", "#4A7BF7", "#FF8FA3", "#8B6CFC", "#67C587"];

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
  const color = NODE_COLORS[index % NODE_COLORS.length];

  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpen(node)}
        className="group relative w-full max-w-md rounded-3xl border-2 bg-white p-5 text-left shadow-sm shadow-black/[0.03] backdrop-blur transition-all tilt-card hover-glow focus-visible:outline-none"
        style={{ borderColor: `${color}30` }}
      >
        <span
          className="absolute -top-3 left-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
          style={{ background: color }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-sm font-bold tracking-widest text-[#5A5A5A] group-hover:text-[#6C5CE7]">
          {node.label}
        </p>
        <p className="mt-1.5 text-sm text-[#8A8A82]">{node.question}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium" style={{ color }}>
          How Claude helps here <ChevronDown className="h-3 w-3" />
        </span>
      </motion.button>

      {/* animated connector */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="h-10 w-px origin-top"
          style={{
            background: `linear-gradient(to bottom, ${color}60, transparent)`,
          }}
        />
      )}
    </div>
  );
}

export function WorkflowSection() {
  const [open, setOpen] = useState<WorkflowNode | null>(null);

  return (
    <section id="workflow" className="relative py-24 sm:py-32">
      <FloatingDecorations preset="workflow" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Squiggle color="#FF7B72" className="opacity-40" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7B72]">The Full Picture</p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Marketing isn't one task.{" "}
            <span className="text-gradient">It's a system.</span>
          </h2>
          <p className="mt-4 text-[#8A8A82]">
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
        <DialogContent className="max-w-lg rounded-3xl border border-[#E8E4DE] bg-white p-6 shadow-2xl shadow-black/[0.06]">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#2D2D2D]">{open.label}</DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-sm text-[#8A8A82]">{open.explanation}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {(["input", "analysis", "insight"] as const).map((k) => (
                  <div key={k} className="rounded-2xl border border-[#E8E4DE]/50 bg-[#FFF8F0] p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C5CE7]">{k}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8A8A82]">{open.claudeFlow[k]}</p>
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
