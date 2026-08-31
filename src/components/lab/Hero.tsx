import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Loader2, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_EXAMPLES } from "@/data/content";
import { USE_CASES } from "@/data/useCases";
import { HeroIllustration } from "@/components/lab/Illustrations";
import { FloatingDecorations } from "@/components/lab/Decorations";
import { classifyProblem } from "@/lib/ai-engine";
import type { ClassifiedProblem } from "@/lib/lab-types";

const CATEGORIES = [
  { id: "market", label: "Market", emoji: "🌍", color: "#8B6CFC", bg: "#F5F0FF" },
  { id: "customer", label: "Customer", emoji: "👥", color: "#4A7BF7", bg: "#F0F4FF" },
  { id: "campaign", label: "Campaign", emoji: "📣", color: "#67C587", bg: "#EDFFF4" },
  { id: "content", label: "Content", emoji: "✍️", color: "#4A7BF7", bg: "#F0F4FF" },
  { id: "analytics", label: "Analytics", emoji: "📊", color: "#FF8FA3", bg: "#FFF0F3" },
  { id: "sales", label: "Sales", emoji: "💰", color: "#FF9B54", bg: "#FFF4ED" },
  { id: "competitor", label: "Competitor", emoji: "🕵️", color: "#FF7B72", bg: "#FFEEED" },
  { id: "product", label: "Product", emoji: "💡", color: "#FFD84D", bg: "#FFF8E5" },
];

function ProblemAnalysis({ useCaseId, classification }: { useCaseId: string; classification?: ClassifiedProblem | null }) {
  const uc = USE_CASES.find((u) => u.id === useCaseId);
  if (!uc) return null;

  // Use live classification data if available, fall back to static UseCase data
  const analysis = [
    { k: "Problem Category", v: classification?.category || uc.category, icon: "🏷️" },
    { k: "Recommended Workflow", v: classification ? `${classification.matchedUseCaseTitle} — guided workflow` : `${uc.title} — ${uc.steps.length} guided steps`, icon: "🔄" },
    { k: "Why this workflow?", v: classification?.matchedReason || "Best match for your business problem", icon: "💡" },
    { k: "Recommended Skill", v: classification?.recommendedSkill || uc.skillDetails?.name || uc.capability, icon: "🧰" },
    { k: "Information Needed", v: (() => { const info = classification?.requiredInformation || uc.evidenceNeeded.slice(0, 3); return info.slice(0, 3).join(", ") + (info.length > 3 ? "…" : ""); })(), icon: "📋" },
    { k: "Recommended Connectors", v: classification?.recommendedConnectors?.join(", ") || uc.connectorDetails?.map((c) => c.name).join(", ") || uc.sources.map((s) => s.name).join(", "), icon: "🔗" },
    { k: "Expected Output", v: classification ? "Live structured analysis with business insight" : uc.outputDescription, icon: "📊" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 rounded-3xl border border-[#67C587]/20 bg-[#67C587]/[0.03] p-5 shadow-sm sm:p-6"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#67C587]">
          <CheckCircle2 className="h-4 w-4" />
          Here's what I think you're trying to solve
        </p>
        {classification && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.06] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#6C5CE7]">
            <span className="h-1 w-1 rounded-full bg-[#6C5CE7]" /> Live · Claude classified
          </span>
        )}
        {!classification && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
            <span className="h-1 w-1 rounded-full bg-amber-500" /> Demo · keyword match
          </span>
        )}
      </div>
      <div className="grid gap-2">
        {analysis.map((row, i) => (
          <motion.div
            key={row.k}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col gap-0.5 rounded-2xl border border-[#67C587]/10 bg-white px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="text-sm">{row.icon}</span>
            <span className="w-40 shrink-0 text-[11px] font-bold tracking-wider text-[#67C587]">{row.k}</span>
            <span className="text-sm text-[#5A5A5A] line-clamp-2">{row.v}</span>
          </motion.div>
        ))}
      </div>
      <Button
        size="sm"
        className="mt-4 w-full rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#8B6CFC] font-semibold text-white shadow-md shadow-purple-500/15 sm:w-auto hover:shadow-lg"
        onClick={() => {
          document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent("open-use-case", { detail: useCaseId }));
        }}
      >
        <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
        Open the full {uc.title} workflow
      </Button>
    </motion.div>
  );
}

export function Hero() {
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [classifying, setClassifying] = useState(false);
  const [classification, setClassification] = useState<ClassifiedProblem | null>(null);

  // Keyword-based fallback matcher (used when Claude is unavailable)
  const fallbackMatch = useMemo(() => {
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
    if (q.includes("complaint") || q.includes("wheel") || q.includes("quality")) return "customer-complaint-analysis";
    if (q.includes("sales") && (q.includes("decline") || q.includes("drop") || q.includes("fell"))) return "sales-decline-investigation";
    if (q.includes("product") && q.includes("launch")) return "product-launch-planning";
    return null;
  }, [query]);

  // Live Claude classification
  const handleClassify = useCallback(async (problem: string) => {
    setClassifying(true);
    setClassification(null);
    try {
      const result = await classifyProblem(problem);
      if (result) {
        setClassification(result);
        setPreviewId(result.matchedUseCaseId);
      } else {
        // Fallback to keyword match
        setPreviewId(fallbackMatch ?? HERO_EXAMPLES[0].useCaseId);
      }
    } catch {
      setPreviewId(fallbackMatch ?? HERO_EXAMPLES[0].useCaseId);
    } finally {
      setClassifying(false);
    }
  }, [fallbackMatch]);

  // Debounced auto-classify when user types
  useEffect(() => {
    if (query.trim().length < 5) {
      // Defer state clearing to avoid synchronous setState in effect
      const raf = requestAnimationFrame(() => {
        setClassification(null);
        setPreviewId(null);
      });
      return () => cancelAnimationFrame(raf);
    }
    const timer = setTimeout(() => {
      handleClassify(query);
    }, 600);
    return () => clearTimeout(timer);
  }, [query, handleClassify]);

  const submit = () => {
    if (classifying) return;
    if (classification) {
      // Already classified via Claude
      document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("open-use-case", { detail: classification.matchedUseCaseId })), 300);
    } else if (previewId) {
      document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => window.dispatchEvent(new CustomEvent("open-use-case", { detail: previewId })), 300);
    }
  };

  return (
    <section id="learn" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">
      <FloatingDecorations preset="hero" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ═══ Large rounded warm hero container ═══ */}
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
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6C5CE7]/15 bg-[#6C5CE7]/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#6C5CE7]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6C5CE7] shadow-[0_0_8px] shadow-[#6C5CE7]" />
                  Interactive learning lab for marketers
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="font-display text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-[#2D2D2D] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Turn Claude into your{" "}
                  <span className="text-gradient">Marketing Copilot</span>.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mx-auto mt-5 max-w-xl text-pretty text-base text-[#8A8A82] sm:text-lg"
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
                    className="rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#8B6CFC] px-7 font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/25"
                    onClick={() => document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start Exploring
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#E8E4DE] bg-white/70 px-7 text-[#5A5A5A] hover:border-[#6C5CE7]/30 hover:bg-white hover:text-[#6C5CE7]"
                    onClick={() => document.querySelector("#blocks")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    See How It Works
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

        {/* ═══ Main Workflow Input Card ═══ */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-3xl border border-[#E8E4DE] bg-white p-6 shadow-lg shadow-black/[0.03] sm:p-8">
            {/* Heading with sparkle */}
            <div className="mb-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5 text-[#FFD84D]" />
                <h2
                  className="text-2xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-3xl"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  What business problem are you trying to solve?
                </h2>
                <p className="mt-2 text-sm text-[#8A8A82]">
                  Describe it in plain language. The system will recommend the right skill, connectors, and prompt.
                </p>
                <Sparkles className="h-5 w-5 text-[#FFD84D]" />
              </motion.div>
            </div>

            {/* Category Cards — clean grid, NO overlap */}
            <div className="mb-6 grid grid-cols-4 gap-2.5 sm:grid-cols-8">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(active ? null : cat.id)}
                    className="group flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3 text-center transition-all hover:scale-[1.03]"
                    style={{
                      borderColor: active ? cat.color : "transparent",
                      background: active ? cat.bg : "#FAF9F6",
                    }}
                  >
                    <span className="text-xl">{cat.emoji}</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: active ? cat.color : "#8A8A82" }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prompt Input */}
            <label htmlFor="hero-goal" className="mb-2 block text-center text-sm font-medium text-[#5A5A5A]">
              Describe your business problem in plain language — no AI terms needed
            </label>
            <div className="glass flex items-center gap-2 rounded-2xl p-2 pl-4 shadow-sm">
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
                disabled={classifying || !query.trim()}
                className="rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8B6CFC] px-4 font-semibold text-white hover:shadow-lg hover:shadow-purple-500/15 disabled:opacity-50"
                aria-label="Show recommended workflow"
              >
                {classifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>

            {/* Suggested Business Problems */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {HERO_EXAMPLES.map((ex) => (
                <button
                  key={ex.useCaseId}
                  onClick={() => {
                    setQuery(ex.text.replace("…", ""));
                    // Trigger classification for this specific use case
                    setClassification(null);
                    setPreviewId(ex.useCaseId);
                  }}
                  className="rounded-full border border-[#E8E4DE] bg-[#FAF9F6] px-3.5 py-1.5 text-xs text-[#8A8A82] transition-all hover:border-[#6C5CE7]/30 hover:bg-[#6C5CE7]/5 hover:text-[#6C5CE7]"
                >
                  {ex.text}
                </button>
              ))}
              <span className="rounded-full border border-[#E8E4DE] bg-[#FAF9F6] px-3.5 py-1.5 text-xs text-[#8A8A82]">
                or browse all use cases below ↓
              </span>
            </div>

            {/* Classifying indicator */}
            {classifying && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#6C5CE7]/10 bg-[#6C5CE7]/[0.03] p-3"
              >
                <Loader2 className="h-4 w-4 animate-spin text-[#6C5CE7]" />
                <span className="text-xs font-medium text-[#6C5CE7]">Claude is analyzing your problem…</span>
              </motion.div>
            )}

            {/* Problem Analysis Preview */}
            <AnimatePresence mode="wait">
              {previewId && !classifying && (
                <ProblemAnalysis key={previewId} useCaseId={previewId} classification={classification} />
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <ArrowDown className="h-5 w-5 animate-bounce text-[#B0B0BA]" />
        </div>
      </div>
    </section>
  );
}
