import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useLab } from "@/context/LabContext";
import { FLASHCARDS, QUIZZES, type Quiz } from "@/data/content";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { FloatingDecorations, Squiggle } from "@/components/lab/Decorations";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticTilt(4);
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`tilt-card hover-glow ${className ?? ""}`}>
      {children}
    </div>
  );
}

function QuizCard({ quiz, index }: { quiz: Quiz; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const { answerQuiz } = useLab();
  const answered = selected !== null;
  const correct = selected === quiz.correctIndex;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    answerQuiz(quiz.id, i, i === quiz.correctIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3) }}
    >
      <TiltCard className="rounded-3xl border border-[#D6E0FF] bg-white p-5 shadow-md shadow-blue-500/5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#FF7B72]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF7B72]">
            Challenge · {quiz.topic}
          </span>
          {answered && (
            <span className={`flex items-center gap-1 text-xs font-semibold ${correct ? "text-[#67C587]" : "text-rose-500"}`}>
              {correct ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              {correct ? "Correct" : "Not quite"}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[#111111]">{quiz.question}</p>
        <div className="mt-4 grid gap-2">
          {quiz.options.map((opt, i) => {
            const state =
              !answered ? "idle"
              : i === quiz.correctIndex ? "right"
              : i === selected ? "wrong"
              : "dim";
            return (
              <button
                key={opt}
                onClick={() => choose(i)}
                disabled={answered}
                aria-pressed={selected === i}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${
                  state === "idle" ? "border-[#D6E0FF] bg-white/60 hover:border-[#2563EB]/40 hover:bg-white"
                  : state === "right" ? "border-[#67C587]/40 bg-[#67C587]/[0.08] text-[#67C587]"
                  : state === "wrong" ? "border-rose-300/60 bg-rose-50 text-rose-600"
                  : "border-[#D6E0FF]/40 text-[#B0B0BA]"
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-[#D6E0FF] bg-[#F4F6FF] text-[11px] font-bold text-[#444444]">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        <AnimatePresence>
          {answered && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
              <div className="mt-3 rounded-xl border border-[#2563EB]/15 bg-[#2563EB]/[0.04] p-3.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Why</p>
                <p className="mt-1 text-sm leading-relaxed text-[#7A7A8A]">{quiz.explanation}</p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltCard>
    </motion.div>
  );
}

const CHARACTER_EMOJI: Record<string, string> = {
  "speech-bubble": "💬",
  toolbox: "🧰",
  bridge: "🌉",
  "circular-arrow": "🔁",
  calendar: "🗓️",
};

function Flashcard({ card, index }: { card: typeof FLASHCARDS[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.08, 0.4) }}
      className="perspective-800 cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative h-56 w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-[#D6E0FF] bg-gradient-to-br from-white to-[#F4F6FF] p-6 shadow-md shadow-blue-500/5 [backface-visibility:hidden] hover-glow">
          <span className="text-4xl" role="img" aria-hidden>
            {CHARACTER_EMOJI[card.character] || card.character}
          </span>
          <p className="mt-4 text-2xl font-bold tracking-tight text-[#111111]">{card.term}</p>
          <p className="mt-2 text-xs text-[#B0B0BA]">Click to flip</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-[#2563EB]/20 bg-gradient-to-br from-[#2563EB]/5 to-white p-6 shadow-md shadow-blue-500/5 [backface-visibility:hidden] [transform:rotateY(180deg)] hover-glow">
          <p className="text-center text-sm leading-relaxed text-[#444444]">{card.definition}</p>
          <p className="mt-3 text-center text-xs text-[#7A7A8A] italic">"{card.example}"</p>
          {showWhy && (
            <p className="mt-3 text-center text-xs leading-relaxed text-[#2563EB]">{card.whyItMatters}</p>
          )}
          {!showWhy && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowWhy(true); }}
              className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Why?
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Learning() {
  const [tab, setTab] = useState<"quizzes" | "flashcards">("quizzes");
  const { markSectionVisited, quizScore } = useLab();

  useState(() => {
    markSectionVisited("learn");
  });

  return (
    <section id="learn-hub" className="relative py-24 sm:py-32">
      <FloatingDecorations preset="learn" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Squiggle color="#2563EB" className="opacity-40" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2563EB]">
            <BrainCircuit className="mr-1 inline h-4 w-4" /> Test your knowledge
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Learn by <span className="text-gradient">doing</span>, not reading.
          </h2>
          {quizScore.total > 0 && (
            <p className="mt-3 text-sm text-[#7A7A8A]">
              Score: <span className="font-bold text-[#67C587]">{quizScore.correct}</span>/{quizScore.total} correct
            </p>
          )}
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {(["quizzes", "flashcards"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                tab === t
                  ? "border-[#2563EB]/40 bg-[#2563EB]/10 text-[#2563EB]"
                  : "border-[#D6E0FF] bg-white/60 text-[#7A7A8A] hover:text-[#111111]"
              }`}
            >
              {t === "quizzes" ? "Quizzes" : "Flashcards"}
            </button>
          ))}
        </div>

        {tab === "quizzes" ? (
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {QUIZZES.map((q, i) => (
              <QuizCard key={q.id} quiz={q} index={i} />
            ))}
          </div>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {FLASHCARDS.map((card, i) => (
              <Flashcard key={card.term} card={card} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
