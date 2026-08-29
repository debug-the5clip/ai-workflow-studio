import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLab } from "@/context/LabContext";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticTilt(5);
  return (
    <div ref={ref as any} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`tilt-card hover-glow ${className ?? ""}`}>
      {children}
    </div>
  );
}

const GOALS = [
  { id: "customer-research", emoji: "🔎", label: "Customer Research" },
  { id: "competitor-analysis", emoji: "🕵️", label: "Competitor Analysis" },
  { id: "campaign-planning", emoji: "📣", label: "Campaign" },
  { id: "instagram-content", emoji: "📱", label: "Content" },
  { id: "campaign-analysis", emoji: "📊", label: "Analytics" },
] as const;

const GOAL_ASSEMBLY: Record<string, { block: string; note: string }[]> = {
  "customer-research": [
    { block: "PROMPT", note: "Structured instructions for customer research — context, evidence types, output format." },
    { block: "SKILL", note: "Customer Research Skill: consistent theme-clustering method every time." },
    { block: "CONNECTOR", note: "Google Drive for review exports + Public Web Source for supplementary data." },
    { block: "HUMAN REVIEW", note: "Verify themes match what sales/support actually hears." },
    { block: "LOOP", note: "Re-run every quarter. Track which themes grow or shrink." },
    { block: "ROUTINE", note: "Add to monthly research cadence — same day, same structure, every month." },
  ],
  "competitor-analysis": [
    { block: "PROMPT", note: "Structured competitor comparison — pricing, positioning, sentiment, gaps." },
    { block: "SKILL", note: "Competitor Intelligence Skill: locked-in comparison structure every quarter." },
    { block: "CONNECTOR", note: "Web Search for public data + Google Drive for past reports." },
    { block: "HUMAN REVIEW", note: "Verify prices are current, complaints are recent, gaps are real." },
    { block: "LOOP", note: "Run quarterly. Track competitor evolution and emerging gaps." },
    { block: "ROUTINE", note: "Quarterly competitor audit — same day, same competitors, same dimensions." },
  ],
  "campaign-planning": [
    { block: "PROMPT", note: "Campaign brief — insight, message, audience, channels, CTA, metrics." },
    { block: "SKILL", note: "Campaign Planning Skill: every brief follows the same structure." },
    { block: "CONNECTOR", note: "Google Drive for brand docs + Google Calendar for timing alignment." },
    { block: "HUMAN REVIEW", note: "Verify insight matches customer research. Check brand voice consistency." },
    { block: "LOOP", note: "Feed campaign results back into the next planning cycle." },
    { block: "ROUTINE", note: "Pre-launch campaign planning — always 4 weeks before launch." },
  ],
  "instagram-content": [
    { block: "PROMPT", note: "Content repurposing — source material to Instagram captions, hashtags, visual direction." },
    { block: "SKILL", note: "Content Repurposing Skill: consistent platform adaptation every time." },
    { block: "CONNECTOR", note: "Google Drive for source content + Notion for brand guidelines." },
    { block: "HUMAN REVIEW", note: "Check brand visual guidelines, platform policy compliance, hashtag trends." },
    { block: "LOOP", note: "Batch-create weekly. Track engagement per content type." },
    { block: "ROUTINE", note: "Weekly content batch — Monday morning, same structure, every week." },
  ],
  "campaign-analysis": [
    { block: "PROMPT", note: "Performance analysis — what worked, what didn't, what to test next." },
    { block: "SKILL", note: "Campaign Analysis Skill: standardized success metrics across campaigns." },
    { block: "CONNECTOR", note: "Connected analytics data + Google Drive for campaign brief." },
    { block: "HUMAN REVIEW", note: "Correlation vs. causation check. External factors review." },
    { block: "LOOP", note: "Core optimization loop: run → measure → learn → experiment → run again." },
    { block: "ROUTINE", note: "Post-campaign readout — 48 hours after every campaign ends." },
  ],
};

const CHAIN = ["RESEARCH", "INSIGHT", "CREATE", "EXECUTE", "MEASURE", "LEARN", "OPTIMIZE"];

export function FinalBuilder() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showAssembled, setShowAssembled] = useState(false);
  const { resetProgress, progressPercent } = useLab();

  const assembled = selectedGoal ? GOAL_ASSEMBLY[selectedGoal] : null;

  return (
    <section id="builder" className="relative py-24 sm:py-32">
      <div className="aurora-blob right-[15%] bottom-[10%] h-80 w-80 bg-[#7B8EC9]/6" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D97757]">The Grand Assembly</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[#1C1C1C] sm:text-5xl">
            Build your own{" "}
            <span className="text-gradient">Claude marketing workflow</span>.
          </h2>
          <p className="mt-4 text-[#6B6B66]">
            Pick your primary goal. We'll assemble the complete system — Prompt + Skill + Connector +
            Human Review + Loop + Routine — the same architecture a real marketing team would run.
          </p>
        </div>

        {/* Goal picker */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GOALS.map((goal) => {
            const on = selectedGoal === goal.id;
            return (
              <motion.button
                key={goal.id}
                onClick={() => { setSelectedGoal(goal.id); setShowAssembled(false); }}
                aria-pressed={on}
                whileTap={{ scale: 0.97 }}
                className={`relative tilt-card rounded-3xl border p-5 text-center transition-all focus-visible:outline-none ${
                  on
                    ? "border-[#D97757]/50 bg-[#D97757]/[0.06] shadow-md shadow-[#D97757]/10"
                    : "border-[#E2E0DB] bg-white/70 hover:border-[#D97757]/25 hover-glow"
                }`}
              >
                <span className="text-3xl">{goal.emoji}</span>
                <p className="mt-2 text-sm font-bold text-[#1C1C1C]">{goal.label}</p>
                <span
                  className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                    on ? "border-[#D97757] bg-[#D97757] text-white" : "border-[#E2E0DB] text-transparent"
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
            disabled={!selectedGoal}
            onClick={() => setShowAssembled(true)}
            className={`rounded-full px-8 font-semibold ${
              selectedGoal
                ? "bg-[#D97757] text-white glow-primary hover:bg-[#c06545]"
                : "bg-[#E2E0DB] text-[#9A968F]"
            }`}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Assemble my system
          </Button>
          {selectedGoal && (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-[#E2E0DB] text-[#6B6B66]"
              onClick={() => { setSelectedGoal(null); setShowAssembled(false); }}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Start over
            </Button>
          )}
        </div>

        {/* Assembled workflow */}
        <AnimatePresence>
          {showAssembled && assembled && (
            <motion.div
              id="assembled"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-16 max-w-3xl"
            >
              {/* Assembly blocks */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {assembled.map((block, i) => (
                  <motion.div
                    key={block.block}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="glass-light rounded-2xl p-4 shadow-sm shadow-black/[0.04] tilt-card hover-glow"
                  >
                    <p className="text-xs font-bold tracking-widest text-[#D97757]">{block.block}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#6B6B66]">{block.note}</p>
                  </motion.div>
                ))}
              </div>

              {/* Final assembled card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 rounded-3xl border border-[#D97757]/20 bg-gradient-to-br from-[#D97757]/[0.06] to-[#C47AB0]/[0.04] p-6 text-center shadow-md shadow-[#D97757]/5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97757]">Your Claude-Assisted Marketing System</p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#4A4A46]">
                  {selectedGoal === "customer-research" && "Every month, a Customer Research Skill uses your connected review data to cluster customer themes, a human reviews the findings, and validated insights feed into your content and product planning Loop."}
                  {selectedGoal === "competitor-analysis" && "Every quarter, a Competitor Intelligence Skill uses web research and your past reports to compare your top competitors, a human reviews the findings, and gaps get added to your campaign planning Loop."}
                  {selectedGoal === "campaign-planning" && "Before every launch, a Campaign Planning Skill pulls from your brand docs and calendar to build a structured brief, a human reviews the strategy, and results feed back into the next planning cycle."}
                  {selectedGoal === "instagram-content" && "Every Monday, a Content Repurposing Skill transforms your source material into platform-ready Instagram posts, a human reviews brand compliance, and engagement data improves next week's batch."}
                  {selectedGoal === "campaign-analysis" && "After every campaign, a Campaign Analysis Skill structures the performance data into what worked/didn't/test next, a human reviews the insights, and experiments feed into your next campaign Loop."}
                </p>

                {/* Chain visualization */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {CHAIN.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full bg-[#E2E0DB]/60 px-3 py-1 text-xs font-bold text-[#4A4A46]">{step}</span>
                      {i < CHAIN.length - 1 && <span className="text-[#9A968F]">→</span>}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#D97757] px-5 font-semibold text-white hover:bg-[#c06545]"
                    onClick={() => {
                      const useCaseMap: Record<string, string> = {
                        "customer-research": "customer-research",
                        "competitor-analysis": "competitor-analysis",
                        "campaign-planning": "campaign-planning",
                        "instagram-content": "instagram-content",
                        "campaign-analysis": "campaign-analysis",
                      };
                      const ucId = useCaseMap[selectedGoal || ""];
                      if (ucId) {
                        document.querySelector("#usecases")?.scrollIntoView({ behavior: "smooth" });
                        setTimeout(() => window.dispatchEvent(new CustomEvent("open-use-case", { detail: ucId })), 300);
                      }
                    }}
                  >
                    Start This Workflow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-[#E2E0DB] text-[#6B6B66]"
                    onClick={() => { setSelectedGoal(null); setShowAssembled(false); }}
                  >
                    Explore Another Goal
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress */}
        {progressPercent > 0 && (
          <div className="mx-auto mt-16 max-w-md text-center">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E0DB]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D97757] to-[#C47AB0]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[#6B6B66]">
              {progressPercent}% of the lab explored
              {progressPercent === 100 && " — you've completed the full journey!"}
            </p>
            {progressPercent === 100 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 rounded-full border-[#E2E0DB] text-[#6B6B66]"
                onClick={resetProgress}
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Start fresh
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
