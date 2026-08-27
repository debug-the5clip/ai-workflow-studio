import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLOATING_ELEMENTS, HERO_EXAMPLES } from "@/data/content";
import { USE_CASES } from "@/data/useCases";

// Positions on an elliptical orbit around the hero visual (percent-based)
const ORBIT = [
  { x: -34, y: -26 },
  { x: 30, y: -32 },
  { x: -42, y: 8 },
  { x: 40, y: 4 },
  { x: -28, y: 38 },
  { x: 34, y: 36 },
  { x: -6, y: -40 },
  { x: 6, y: 44 },
];

function AiCore() {
  return (
    <div className="relative grid place-items-center" aria-hidden>
      {/* pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#D97757]/15"
          style={{ width: 220 + i * 90, height: 220 + i * 90 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}
      {/* core */}
      <motion.div
        className="relative h-44 w-44 rounded-full bg-gradient-to-br from-[#D97757] via-[#E8956F] to-[#F2C88F] shadow-lg shadow-[#D97757]/20"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-3 rounded-full border border-white/40 backdrop-blur-sm" />
        <div className="absolute inset-6 rounded-full border border-white/20" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white/90">
          ✦
        </div>
      </motion.div>
    </div>
  );
}

function PreviewChain({ useCaseId }: { useCaseId: string }) {
  const uc = USE_CASES.find((u) => u.id === useCaseId);
  if (!uc) return null;
  const chain = [
    { k: "BUSINESS GOAL", v: uc.goal },
    { k: "WORKFLOW", v: `${uc.category} workflow · ${uc.steps.length} guided steps` },
    { k: "SKILL", v: uc.capabilityReason.split(".")[0] ?? "Structured analysis method" },
    { k: "CONNECTOR", v: uc.sources[0]?.name ?? "Public web source" },
    { k: "PROMPT", v: uc.prompt.split("\n")[0] },
    { k: "EXPECTED OUTPUT", v: uc.outputDescription },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-light mt-5 rounded-2xl p-4 shadow-lg shadow-black/[0.04] sm:p-5"
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D97757]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D97757]" />
        Workflow preview · {uc.title}
      </p>
      <div className="grid gap-2">
        {chain.map((row, i) => (
          <motion.div
            key={row.k}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col gap-0.5 rounded-xl border border-[#E2E0DB]/60 bg-[#F5F4F0]/60 px-3 py-2 sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="w-40 shrink-0 text-[11px] font-bold tracking-wider text-[#D97757]">{row.k}</span>
            <span className="text-sm text-[#4A4A46] line-clamp-2">{row.v}</span>
          </motion.div>
        ))}
      </div>
      <Button
        size="sm"
        className="mt-4 w-full rounded-full bg-[#D97757] font-semibold text-white sm:w-auto hover:bg-[#c06545]"
        onClick={() => {
          document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent("open-use-case", { detail: useCaseId }));
        }}
      >
        Open the full {uc.title} workflow
      </Button>
    </motion.div>
  );
}

export function Hero() {
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const suggestion = useMemo(() => {
    if (query.trim().length < 3) return null;
    const q = query.toLowerCase();
    const found = HERO_EXAMPLES.find((e) => e.text.toLowerCase().includes(q.slice(0, 12)));
    if (found) return found.useCaseId;
    if (q.includes("compet")) return "competitor-analysis";
    if (q.includes("campaign") || q.includes("launch")) return "campaign-planning";
    if (q.includes("review") || q.includes("customer")) return "customer-research";
    if (q.includes("cart") || q.includes("conver") || q.includes("analyt")) return "campaign-analysis";
    if (q.includes("email")) return "email-marketing";
    if (q.includes("social") || q.includes("instagram")) return "instagram-content";
    if (q.includes("test")) return "ab-testing";
    return null;
  }, [query]);

  const submit = () => {
    setPreviewId(suggestion ?? HERO_EXAMPLES[0].useCaseId);
  };

  return (
    <section id="learn" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      {/* aurora blobs — soft warm glow on light bg */}
      <div className="aurora-blob left-[8%] top-[12%] h-72 w-72 bg-[#D97757]/10" />
      <div className="aurora-blob right-[5%] top-[45%] h-80 w-80 bg-[#C47AB0]/8" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#D97757]/20 bg-[#D97757]/6 px-4 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#D97757]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97757] shadow-[0_0_10px] shadow-[#D97757]" />
            An interactive Claude learning lab for marketers
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#1C1C1C] sm:text-6xl lg:text-7xl"
          >
            Don't read about{" "}
            <span className="text-gradient">AI marketing</span>. Run it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-base text-[#6B6B66] sm:text-lg"
          >
            Pick a real marketing problem. Watch how Claude breaks it down, what
            information it needs, and what a finished, reviewable answer looks like
            — then take the same approach into your own work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="rounded-full bg-[#D97757] px-7 font-semibold text-white glow-primary hover:bg-[#c06545]"
              onClick={() => document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start a Workflow
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#E2E0DB] bg-white/70 px-7 text-[#4A4A46] hover:bg-white hover:text-[#1C1C1C]"
              onClick={() => document.querySelector("#blocks")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="mr-2 h-4 w-4" /> See How Claude Actually Works
            </Button>
          </motion.div>
        </div>

        {/* ── Interactive visual ─────────────────────────────────────────── */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[400px]">
            <AiCore />
            {FLOATING_ELEMENTS.map((el, i) => {
              const pos = ORBIT[i % ORBIT.length];
              return (
                <motion.div
                  key={el.label}
                  className="group absolute z-10"
                  style={{
                    left: `calc(50% + ${pos.x}%)`,
                    top: `calc(50% + ${pos.y}%)`,
                  }}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`${el.label}: ${el.insight}`}
                    className="glass-light cursor-default rounded-xl px-3 py-2 text-[11px] font-semibold tracking-widest text-[#4A4A46] transition-all hover:border-[#D97757]/40 hover:text-[#D97757] focus-visible:border-[#D97757]/40 focus-visible:outline-none sm:text-xs"
                  >
                    {el.label}
                    <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-xl border border-[#E2E0DB] bg-white p-2.5 text-[11px] font-normal leading-snug normal-case tracking-normal text-[#4A4A46] opacity-0 shadow-xl shadow-black/[0.06] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                      {el.insight}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Prompt field ─────────────────────────────────────────────── */}
          <div className="mx-auto mt-6 max-w-2xl">
            <label htmlFor="hero-goal" className="mb-2 block text-center text-sm font-medium text-[#4A4A46]">
              What do you want to accomplish?
            </label>
            <div className="glass flex items-center gap-2 rounded-2xl p-2 pl-4 shadow-md shadow-black/[0.03]">
              <input
                id="hero-goal"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Analyze what competitors are doing in the luggage market…"
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9A968F]"
              />
              <Button
                size="sm"
                onClick={submit}
                className="rounded-xl bg-[#D97757] px-4 font-semibold text-white hover:bg-[#c06545]"
                aria-label="Show recommended workflow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {HERO_EXAMPLES.map((ex) => (
                <button
                  key={ex.useCaseId}
                  onClick={() => {
                    setQuery(ex.text.replace("…", ""));
                    setPreviewId(ex.useCaseId);
                  }}
                  className="rounded-full border border-[#E2E0DB] bg-white/60 px-3 py-1.5 text-xs text-[#6B6B66] transition-colors hover:border-[#D97757]/30 hover:text-[#D97757]"
                >
                  {ex.text}
                </button>
              ))}
            </div>
            {previewId && <PreviewChain useCaseId={previewId} />}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <ArrowDown className="h-5 w-5 animate-bounce text-[#9A968F]" />
        </div>
      </div>
    </section>
  );
}
