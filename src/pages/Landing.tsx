import { LabProvider } from "@/context/LabContext";
import { Nav } from "@/components/lab/Nav";
import { Hero } from "@/components/lab/Hero";
import { WorkflowSection } from "@/components/lab/WorkflowSection";
import { BuildingBlocks } from "@/components/lab/BuildingBlocks";
import { UseCaseEngine } from "@/components/lab/UseCaseEngine";
import { Learning } from "@/components/lab/Learning";
import { FinalBuilder } from "@/components/lab/FinalBuilder";
import { Trust, Footer } from "@/components/lab/Trust";
import { motion } from "framer-motion";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticTilt(5);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card hover-glow ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    step: "LEARN",
    emoji: "📖",
    description:
      "See the five building blocks Claude marketers use: Prompt, Skill, Connector, Loop, Routine — explained through real examples, not definitions.",
    color: "from-[#2563EB]/[0.08] to-[#2563EB]/[0.02]",
    border: "border-[#2563EB]/15",
    accent: "#2563EB",
  },
  {
    step: "BUILD",
    emoji: "🛠️",
    description:
      "Choose a business problem. Claude Marketing Lab walks you through the exact information, capability, and instruction it takes to solve it.",
    color: "from-[#7C5CFC]/[0.08] to-[#7C5CFC]/[0.02]",
    border: "border-[#7C5CFC]/15",
    accent: "#7C5CFC",
  },
  {
    step: "REVIEW",
    emoji: "✅",
    description:
      "Every workflow ends the same way real marketing work should: a human reviewing Claude's output before it becomes a business decision.",
    color: "from-[#67C587]/[0.08] to-[#67C587]/[0.02]",
    border: "border-[#67C587]/15",
    accent: "#67C587",
  },
];

const CHANNELS = [
  { name: "Google Drive", type: "connector" as const, color: "#4285F4" },
  { name: "Gmail", type: "connector" as const, color: "#EA4335" },
  { name: "Notion", type: "connector" as const, color: "#111111" },
  { name: "Instagram", type: "channel" as const, color: "#E4405F" },
  { name: "YouTube", type: "channel" as const, color: "#FF0000" },
  { name: "Web Search", type: "connector" as const, color: "#2563EB" },
  { name: "Email", type: "channel" as const, color: "#FF9B54" },
  { name: "Spreadsheets", type: "source" as const, color: "#67C587" },
];

export default function Landing() {
  return (
    <LabProvider>
      <div className="min-h-screen">
        <Nav />
        <Hero />

        {/* ═══ Trust / Channel Strip ═══ */}
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#B0B0BA]">
              Built around the tools and channels marketers already use
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
              {CHANNELS.map((ch) => (
                <div
                  key={ch.name}
                  className="flex items-center gap-2 rounded-full border border-[#D6E0FF] bg-white/80 px-4 py-2 text-xs font-medium text-[#444444] shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: ch.color }} />
                  {ch.name}
                  <span className="rounded-full bg-[#F4F6FF] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7A7A8A]">
                    {ch.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ How It Works ═══ */}
        <section id="how-it-works" className="relative py-20 sm:py-28">
          <FloatingDecorations preset="default" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="mb-4 flex justify-center">
                <Squiggle color="#FFD84D" className="opacity-50" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7B72]">How it works</p>
              <h2
                className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Three steps to <span className="text-gradient">understanding</span>.
              </h2>
            </div>
            <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
              {HOW_IT_WORKS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <TiltCard
                    className={`rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} p-6 shadow-sm transition-all sm:p-7`}
                  >
                    <div className="mb-3 text-3xl">{item.emoji}</div>
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: item.accent }}
                    >
                      {item.step}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-[#7A7A8A]">
                      {item.description}
                    </p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Squiggle divider */}
        <div className="flex justify-center py-4">
          <Squiggle color="#D6E0FF" className="opacity-60" />
        </div>

        <WorkflowSection />

        <div className="flex justify-center py-4">
          <Squiggle color="#FFD84D" className="opacity-40" />
        </div>

        <BuildingBlocks />

        <div className="flex justify-center py-4">
          <Squiggle color="#7C5CFC" className="opacity-30" />
        </div>

        <UseCaseEngine />

        <div className="flex justify-center py-4">
          <Squiggle color="#67C587" className="opacity-40" />
        </div>

        <Learning />

        <div className="flex justify-center py-4">
          <Squiggle color="#FF7B72" className="opacity-40" />
        </div>

        <FinalBuilder />
        <Trust />
        <Footer />
      </div>
    </LabProvider>
  );
}
