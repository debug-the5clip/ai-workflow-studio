import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GitBranch, MessageSquareText, Repeat, Wrench, Calendar } from "lucide-react";
import { useLab } from "@/context/LabContext";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { CharacterIcon } from "@/components/lab/Illustrations";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticTilt(4);
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`tilt-card hover-glow ${className ?? ""}`}>
      {children}
    </div>
  );
}

type TabId = "prompt" | "skill" | "connector" | "loop" | "routine";

const TABS: { id: TabId; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { id: "prompt", label: "Prompt", icon: MessageSquareText, color: "#4A7BF7", bg: "#F0F4FF" },
  { id: "skill", label: "Skill", icon: Wrench, color: "#8B6CFC", bg: "#F5F0FF" },
  { id: "connector", label: "Connector", icon: GitBranch, color: "#67C587", bg: "#EDFFF4" },
  { id: "loop", label: "Loop", icon: Repeat, color: "#FF9B54", bg: "#FFF4ED" },
  { id: "routine", label: "Routine", icon: Calendar, color: "#FF7B72", bg: "#FFEEED" },
];

const TAB_CONTENT: Record<TabId, { title: string; definition: string; example: string; detail: string }> = {
  prompt: {
    title: "A single instruction, used once.",
    definition: "What should Claude do, right now, one time?",
    example: '"Research our top 3 luggage competitors\' pricing and highlight anything unusual."',
    detail: "One question, one answer. Nothing is saved or repeated.",
  },
  skill: {
    title: "A reusable method Claude follows every time this type of question comes up — not just one instruction, but a whole approach.",
    definition: "How should Claude do this kind of work, every time, the same reliable way?",
    example: 'A "Competitor Intelligence Skill" would always: identify the right competitors, gather comparable evidence, separate fact from interpretation, group findings into themes, and end with clearly-labeled opportunities.',
    detail: "Build this once. Every future competitor question uses the same reliable structure instead of starting from scratch.",
  },
  connector: {
    title: "Where Claude's information or actions come from — authorized access to a real tool or data source, instead of Claude guessing or relying only on general web knowledge.",
    definition: "Where does Claude get real, authorized information or take real action?",
    example: "Connecting Claude to your team's Google Drive so it can read your actual past competitor reports, or to Gmail/Calendar so a completed analysis can be turned directly into a follow-up task.",
    detail: 'A Connector is what turns "Claude thinks" into "Claude knows," because it\'s working with your real, permissioned data.',
  },
  loop: {
    title: "A cycle where each round of work feeds the next one.",
    definition: "How does the work get better each time it's repeated?",
    example: "Run competitor analysis → measure what changed since last time → learn which signals mattered → adjust what you watch for next time → run it again.",
    detail: "A Loop is what makes an analysis get sharper over time instead of staying static.",
  },
  routine: {
    title: 'A Loop that happens on a schedule, as part of a defined sequence.',
    definition: "When, and in what order, does this happen on a recurring schedule?",
    example: '"Every Monday morning, run the Competitor Intelligence Skill against our three main competitors and summarize anything that changed since last week."',
    detail: 'A Routine turns "something we should really do" into "something that happens automatically, on time, every time."',
  },
};

const COMPARISON_TABLE = [
  { col: "Answers", prompt: "What should Claude do?", skill: "How should Claude do this reliably?", connector: "Where does the real information come from?", loop: "How does this improve over time?", routine: "When does this happen automatically?" },
  { col: "Lifespan", prompt: "One time", skill: "Reusable method", connector: "Ongoing access", loop: "Repeating cycle", routine: "Scheduled sequence" },
  { col: "Example", prompt: '"Summarize this review data."', skill: "Competitor Intelligence Skill", connector: "Google Drive, Gmail, web search", loop: "Campaign → measure → learn → repeat", routine: "Weekly Monday competitor check" },
];

export function BuildingBlocks() {
  const [activeTab, setActiveTab] = useState<TabId>("prompt");
  const { markSectionVisited } = useLab();

  useEffect(() => {
    markSectionVisited("blocks");
  }, [markSectionVisited]);

  const content = TAB_CONTENT[activeTab];
  const activeTabConfig = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="blocks" className="relative py-24 sm:py-32">
      <FloatingDecorations preset="learn" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Squiggle color="#8B6CFC" className="opacity-50" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B6CFC]">The five ideas behind the workflow</p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Prompt, Skill, Connector, Loop,{" "}
            <span className="text-gradient">and Routine</span>.
          </h2>
          <p className="mt-4 text-[#8A8A82]">
            Not every task needs the same kind of setup. Learn which approach fits the size of the job.
          </p>
        </div>

        {/* Scenario banner */}
        <div className="mx-auto mb-8 max-w-2xl rounded-3xl border border-[#E8E4DE] bg-white p-5 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B0B0BA]">Scenario</p>
          <p className="mt-1 text-lg font-bold text-[#2D2D2D]" style={{ fontFamily: "'Georgia', serif" }}>"Analyze our competitors."</p>
        </div>

        {/* Tab buttons — colorful pills */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all tilt-card"
                style={{
                  border: `2px solid ${active ? tab.color : "#E8E4DE"}`,
                  background: active ? tab.bg : "rgba(255,255,255,0.7)",
                  color: active ? tab.color : "#8A8A82",
                  boxShadow: active ? `0 4px 12px ${tab.color}15` : "none",
                }}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <TiltCard className="rounded-3xl border border-[#E8E4DE] bg-white p-6 shadow-lg shadow-black/[0.03] sm:p-8">
                <div className="flex items-start gap-4">
                  <CharacterIcon type={activeTab} />
                  <div className="flex-1">
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: activeTabConfig.color }}>
                      {activeTab} — {content.definition}
                    </p>
                    <h3 className="mt-2 text-xl font-bold leading-snug text-[#2D2D2D] sm:text-2xl">{content.title}</h3>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-[#E8E4DE]/50 bg-[#FFF8F0] p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#B0B0BA]">Example</p>
                  <p className="text-sm leading-relaxed text-[#5A5A5A]">{content.example}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#8A8A82]">{content.detail}</p>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Comparison table */}
        <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-3xl border border-[#E8E4DE] bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E4DE]">
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-[#B0B0BA]"></th>
                {TABS.map((t) => (
                  <th
                    key={t.id}
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: t.color }}
                  >
                    {t.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row) => (
                <tr key={row.col} className="border-b border-[#E8E4DE]/40 last:border-0">
                  <td className="px-4 py-3 font-semibold text-[#5A5A5A]">{row.col}</td>
                  <td className="px-4 py-3 text-[#8A8A82]">{row.prompt}</td>
                  <td className="px-4 py-3 text-[#8A8A82]">{row.skill}</td>
                  <td className="px-4 py-3 text-[#8A8A82]">{row.connector}</td>
                  <td className="px-4 py-3 text-[#8A8A82]">{row.loop}</td>
                  <td className="px-4 py-3 text-[#8A8A82]">{row.routine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* "Why Not Just a Prompt?" callout */}
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-[#6C5CE7]/15 bg-[#6C5CE7]/[0.04] p-5">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#6C5CE7]" />
            <div>
              <p className="text-sm font-bold text-[#2D2D2D]">Why not just a Prompt?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#8A8A82]">
                A Skill is only worth building when you'll ask the same <em>kind</em> of question more than a few times,
                when the method matters as much as the answer (so it should stay consistent), or when several teammates
                need to get the same quality of result without re-explaining the approach. If it's a one-off question,
                a good Prompt is faster and just as effective — don't over-build.
              </p>
            </div>
          </div>
        </div>

        {/* Educational note on Routines */}
        <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-[#E8E4DE] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7B72]" />
            <div>
              <p className="text-sm font-bold text-[#2D2D2D]">A note on Routines</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#8A8A82]">
                Claude does not run recurring schedules by itself inside a chat. A "Routine" in this product is an
                <strong> educational framing</strong> of how a marketer would sequence repeated Skill + Connector use,
                not a claim about a built-in autopilot feature. Think of it as a playbook your team follows, not software that runs itself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
