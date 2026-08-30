import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLOATING_ELEMENTS, HERO_EXAMPLES } from "@/data/content";
import { USE_CASES } from "@/data/useCases";
import { HeroIllustration } from "@/components/lab/Illustrations";
import { FloatingDecorations } from "@/components/lab/Decorations";

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

const ACCENT_COLORS = ["#2563EB", "#FF7B72", "#7C5CFC", "#FFD84D", "#67C587", "#FF9B54", "#2563EB", "#FF8FA3"];

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
      className="mt-5 rounded-3xl border border-[#D6E0FF] bg-white p-5 shadow-lg shadow-blue-500/5 sm:p-6"
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2563EB]" />
        Workflow preview · {uc.title}
      </p>
      <div className="grid gap-2">
        {chain.map((row, i) => (
          <motion.div
            key={row.k}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col gap-0.5 rounded-2xl border border-[#D6E0FF]/50 bg-[#F4F6FF] px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="w-40 shrink-0 text-[11px] font-bold tracking-wider text-[#2563EB]">{row.k}</span>
            <span className="text-sm text-[#444444] line-clamp-2">{row.v}</span>
          </motion.div>
        ))}
      </div>
      <Button
        size="sm"
        className="mt-4 w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C5CFC] font-semibold text-white shadow-md shadow-blue-500/15 sm:w-auto hover:shadow-lg"
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
    <section id="learn" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <FloatingDecorations preset="hero" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* ═══ Large rounded periwinkle hero container ═══ */}
        <div className="hero-panel relative overflow-hidden rounded-[2rem] p-6 sm:rounded-[3rem] sm:p-10 lg:p-14">
          {/* Decorative dots inside hero */}
          <div className="absolute right-8 top-8 h-3 w-3 rounded-full bg-[#FFD84D] opacity-50 float-slow" />
          <div className="absolute bottom-12 left-8 h-2 w-2 rounded-full bg-[#FF7B72] opacity-40 float-medium" />
          <div className="absolute right-1/4 top-1/3 h-2 w-2 rounded-full bg-[#67C587] opacity-40 pulse-soft" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left: text content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-[#2563EB]/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2563EB]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shadow-[0_0_8px] shadow-[#2563EB]" />
                  Interactive learning lab for marketers
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="font-display text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Turn Claude into your{" "}
                  <span className="text-gradient">Marketing Copilot</span>.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mx-auto mt-5 max-w-xl text-pretty text-base text-[#7A7A8A] sm:text-lg"
                >
                  Learn how to turn prompts, Skills, Connectors, Loops and Routines into
                  real marketing workflows that solve actual business problems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C5CFC] px-7 font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25"
                    onClick={() => document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start Exploring
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#D6E0FF] bg-white/70 px-7 text-[#444444] hover:border-[#2563EB]/30 hover:bg-white hover:text-[#2563EB]"
                    onClick={() => document.querySelector("#blocks")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Play className="mr-2 h-4 w-4" /> See How It Works
                  </Button>
                </motion.div>
              </div>

              {/* Right: illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Floating marketing elements around hero ── */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="relative flex min-h-[180px] items-center justify-center">
            {FLOATING_ELEMENTS.map((el, i) => {
              const pos = ORBIT[i % ORBIT.length];
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
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
                    className="cursor-default rounded-full border-2 px-4 py-2 text-[11px] font-bold tracking-widest transition-all focus-visible:outline-none sm:text-xs hover-glow"
                    style={{
                      borderColor: `${color}25`,
                      background: `${color}08`,
                      color: color,
                    }}
                  >
                    {el.label}
                    <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-2xl border border-[#D6E0FF] bg-white p-3 text-[11px] font-normal leading-snug normal-case tracking-normal text-[#444444] opacity-0 shadow-xl shadow-blue-500/5 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                      {el.insight}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Prompt field ── */}
          <div className="mx-auto mt-6 max-w-2xl">
            <label htmlFor="hero-goal" className="mb-2 block text-center text-sm font-medium text-[#444444]">
              What do you want to accomplish?
            </label>
            <div className="glass flex items-center gap-2 rounded-2xl p-2 pl-4 shadow-lg shadow-blue-500/5">
              <input
                id="hero-goal"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Analyze what competitors are doing in the luggage market…"
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-[#B0B0BA]"
              />
              <Button
                size="sm"
                onClick={submit}
                className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C5CFC] px-4 font-semibold text-white hover:shadow-lg"
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
                  className="rounded-full border border-[#D6E0FF] bg-white/70 px-3 py-1.5 text-xs text-[#7A7A8A] transition-all hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 hover:text-[#2563EB]"
                >
                  {ex.text}
                </button>
              ))}
            </div>
            {previewId && <PreviewChain useCaseId={previewId} />}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <ArrowDown className="h-5 w-5 animate-bounce text-[#B0B0BA]" />
        </div>
      </div>
    </section>
  );
}
