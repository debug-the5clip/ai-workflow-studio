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

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticTilt(5);
  return (
    <div
      ref={ref as any}
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
    description:
      "See the five building blocks Claude marketers use: Prompt, Skill, Connector, Loop, Routine — explained through real examples, not definitions.",
    color: "from-[#D97757]/[0.08] to-[#D97757]/[0.02]",
    border: "border-[#D97757]/15",
  },
  {
    step: "BUILD",
    description:
      "Choose a business problem. Claude Marketing Lab walks you through the exact information, capability, and instruction it takes to solve it.",
    color: "from-[#6B9E8A]/[0.08] to-[#6B9E8A]/[0.02]",
    border: "border-[#6B9E8A]/15",
  },
  {
    step: "REVIEW",
    description:
      "Every workflow ends the same way real marketing work should: a human reviewing Claude's output before it becomes a business decision.",
    color: "from-[#7B8EC9]/[0.08] to-[#7B8EC9]/[0.02]",
    border: "border-[#7B8EC9]/15",
  },
];

export default function Landing() {
  return (
    <LabProvider>
      <div className="min-h-screen">
        <Nav />
        <Hero />

        {/* How It Works strip */}
        <section id="how-it-works" className="relative py-20 sm:py-28">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D97757]">How it works</p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#1C1C1C] sm:text-5xl">
                Three steps to <span className="text-gradient">understanding</span>.
              </h2>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {HOW_IT_WORKS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard className={`glass-light rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} p-6 shadow-sm shadow-black/[0.03]`}
                  >
                    <span className="relative z-10 text-xs font-bold tracking-widest text-[#D97757]">{item.step}</span>
                    <p className="relative z-10 mt-3 text-sm leading-relaxed text-[#6B6B66]">{item.description}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <WorkflowSection />
        <BuildingBlocks />
        <UseCaseEngine />
        <Learning />
        <FinalBuilder />
        <Trust />
        <Footer />
      </div>
    </LabProvider>
  );
}
