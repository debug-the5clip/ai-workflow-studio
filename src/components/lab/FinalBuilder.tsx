import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Plus, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";

const INGREDIENTS = [
  { id: "customer-research", emoji: "🔎", label: "Customer Research" },
  { id: "competitor-analysis", emoji: "🕵️", label: "Competitor Analysis" },
  { id: "campaign-planning", emoji: "📣", label: "Campaign" },
  { id: "social-media", emoji: "📱", label: "Content" },
  { id: "campaign-analysis", emoji: "📊", label: "Analytics" },
] as const;

const ASSEMBLY = [
  { block: "PROMPT", note: "Structured instructions per task — context, objective, constraints, format." },
  { block: "SKILL", note: "Reusable methods so every week's work follows the same proven pipeline." },
  { block: "CONNECTOR", note: "Authorized sources feeding Claude real, current information." },
  { block: "HUMAN REVIEW", note: "Your judgment verifying evidence, approving claims, making the calls." },
  { block: "LOOP", note: "Results → insights → experiments → improved campaigns, repeating." },
  { block: "ROUTINE", note: "A weekly cadence that runs the system without relying on willpower." },
];

const CHAIN = ["RESEARCH", "INSIGHT", "CREATE", "EXECUTE", "MEASURE", "LEARN", "OPTIMIZE"];

export function FinalBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const { resetProgress, progressPercent } = useLab();
  const ready = selected.length >= 2;

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section id="builder" className="relative py-24 sm:py-32">
      <div className="aurora-blob right-[15%] bottom-[10%] h-80 w-80 bg-fuchsia-600/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">The Grand Assembly</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Build your <span className="text-gradient">marketing workflow</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose at least two ingredients. We'll assemble them into a complete
            Claude-assisted system — the same architecture a real marketing team
            would run.
          </p>
        </div>

        {/* ingredient picker */}
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INGREDIENTS.map((ing) => {
            const on = selected.includes(ing.id);
            return (
              <motion.button
                key={ing.id}
                onClick={() => toggle(ing.id)}
                aria-pressed={on}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-3xl border p-5 text-center transition-all focus-visible:outline-none ${
                  on
                    ? "border-cyan-300/60 bg-cyan-300/[0.08] shadow-[0_0_30px_rgba(56,189,248,0.18)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <span className="text-3xl">{ing.emoji}</span>
                <p className="mt-2 text-sm font-bold">{ing.label}</p>
                <span
                  className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                    on ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/20 text-transparent"
                  }`}
                >
                  <CircleCheck className="h-3 w-3" />
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button
            size="lg"
            disabled={!ready}
            onClick={() => document.querySelector("#assembled")?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className={`rounded-full px-8 font-semibold ${
              ready
                ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 glow-primary"
                : "bg-white/10 text-muted-foreground"
            }`}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Assemble my system{ready ? ` (${selected.length})` : ""}
          </Button>
          {(ready || progressPercent === 100) && (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/15"
              onClick={() => setSelected([])}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          )}
        </div>

        {/* assembled output */}
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="mx-auto mt-14 max-w-4xl"
            >
              <div id="assembled" className="glass rounded-[28px] p-6 sm:p-10">
                <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Your Claude-assisted marketing system
                </p>
                <p className="mt-1 text-center text-lg font-bold">
                  {selected
                    .map((id) => INGREDIENTS.find((i) => i.id === id)?.label)
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                {/* assembly blocks */}
                <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {ASSEMBLY.map((a, i) => (
                    <motion.div
                      key={a.block}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.12 }}
                      className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/[0.08] to-transparent p-4"
                    >
                      <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-cyan-200">
                        {a.block}
                        {i < ASSEMBLY.length - 1 && <Plus className="h-3 w-3 text-white/30" />}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
                    </motion.div>
                  ))}
                </div>

                {/* final chain */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } } }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/[0.05] p-5"
                >
                  {CHAIN.map((c, i) => (
                    <motion.span
                      key={c}
                      variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                      className="flex items-center gap-2"
                    >
                      <span className="rounded-xl bg-white/[0.07] px-3 py-1.5 text-xs font-extrabold tracking-wider">{c}</span>
                      {i < CHAIN.length - 1 && <span className="text-cyan-300">→</span>}
                      {i === CHAIN.length - 1 && <span className="text-cyan-300">↺</span>}
                    </motion.span>
                  ))}
                </motion.div>

                <div className="mt-7 flex flex-col items-center gap-3">
                  <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
                    This is the loop that compounds: research feeds insight,
                    insight feeds creation, measurement feeds learning, learning
                    improves everything downstream.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/15"
                    onClick={() => {
                      setSelected([]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Explore another workflow
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
