import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useLab } from "@/context/LabContext";
import { FLASHCARDS, QUIZZES, type Quiz } from "@/data/content";

// ── Quiz ─────────────────────────────────────────────────────────────────────

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
      className="rounded-3xl border border-white/10 bg-card/60 p-5 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#D97757]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F2C88F]">
          Challenge · {quiz.topic}
        </span>
        {answered && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${correct ? "text-[#6B9E8A]" : "text-rose-300"}`}>
            {correct ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {correct ? "Correct" : "Not quite"}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium leading-relaxed">{quiz.question}</p>
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
                state === "idle" ? "border-white/10 bg-white/[0.03] hover:border-[#D97757]/40 hover:bg-white/[0.05]" :
                state === "right" ? "border-[#6B9E8A]/50 bg-[#6B9E8A]/[0.08] text-emerald-100" :
                state === "wrong" ? "border-rose-300/50 bg-rose-300/[0.08] text-rose-100" :
                "border-white/5 text-muted-foreground/50"
              }`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-white/15 text-[11px] font-bold">
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
            <div className="mt-3 rounded-xl border border-[#D97757]/20 bg-[#D97757]/[0.05] p-3.5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">Why</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{quiz.explanation}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#D97757] hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> Try again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Flashcard (3D flip) ───────────────────────────────────────────────────────

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
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#D97757]/15 to-[#F2C88F]/10 p-6 [backface-visibility:hidden]">
          <span className="text-4xl" role="img" aria-hidden>
            {CHARACTER_EMOJI[card.character] || card.character}
          </span>
          <p className="mt-4 text-2xl font-bold tracking-tight">{card.term}</p>
          <p className="mt-2 text-xs text-muted-foreground">Click to flip</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-[#D97757]/30 bg-[#151922] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-center text-sm leading-relaxed text-foreground/90">{card.definition}</p>
          <p className="mt-3 text-center text-xs text-muted-foreground italic">"{card.example}"</p>
          {showWhy && (
            <p className="mt-3 text-center text-xs leading-relaxed text-[#F2C88F]">{card.whyItMatters}</p>
          )}
          {!showWhy && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowWhy(true); }}
              className="mt-3 text-xs font-semibold text-[#D97757] hover:underline"
            >
              Why?
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Learning Section ─────────────────────────────────────────────────────

export function Learning() {
  const [tab, setTab] = useState<"quizzes" | "flashcards">("quizzes");
  const { markSectionVisited, quizScore } = useLab();

  useState(() => {
    markSectionVisited("learn");
  });

  return (
    <section id="learn-hub" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D97757]">
            <BrainCircuit className="mr-1 inline h-4 w-4" /> Test your knowledge
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Learn by <span className="text-gradient">doing</span>, not reading.
          </h2>
          {quizScore.total > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              Score: <span className="font-bold text-[#6B9E8A]">{quizScore.correct}</span>/{quizScore.total} correct
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
                  ? "border-[#D97757]/60 bg-[#D97757]/15 text-[#F2C88F]"
                  : "border-white/10 text-muted-foreground hover:text-foreground"
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
