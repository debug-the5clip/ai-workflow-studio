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
        <span className="rounded-full bg-fuchsia-300/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fuchsia-200">
          Challenge · {quiz.topic}
        </span>
        {answered && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${correct ? "text-emerald-300" : "text-rose-300"}`}>
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
                state === "idle" ? "border-white/10 bg-white/[0.03] hover:border-cyan-300/40 hover:bg-white/[0.05]" :
                state === "right" ? "border-emerald-300/50 bg-emerald-300/[0.08] text-emerald-100" :
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] p-3.5">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Why</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{quiz.explanation}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:underline"
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

// ── Flashcards ───────────────────────────────────────────────────────────────

const CHARACTER_EMOJI: Record<string, string> = {
  "speech-bubble": "💬",
  toolbox: "🧰",
  bridge: "🌉",
  "circular-arrow": "🔁",
  calendar: "🗓️",
};

function FlashCard({
  card,
  index,
}: {
  card: (typeof FLASHCARDS)[number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const { learnFlashcard } = useLab();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => {
        setFlipped((f) => !f);
        if (!flipped) learnFlashcard(card.term);
      }}
      aria-label={`Flashcard ${card.term}. ${flipped ? "Back side shown." : "Front side shown. Click to flip."}`}
      className="group h-56 w-full [perspective:1200px] focus-visible:outline-none"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* front */}
        <div className="absolute inset-0 grid place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur [backface-visibility:hidden] group-hover:border-cyan-300/40 focus-visible:border-cyan-300/50">
          <div className="text-center">
            <span className="text-4xl" role="img" aria-hidden>
              {CHARACTER_EMOJI[card.character]}
            </span>
            <p className="mt-3 text-xl font-extrabold tracking-[0.2em]">{card.term}</p>
            <p className="mt-2 text-xs text-muted-foreground">Tap to flip</p>
          </div>
        </div>
        {/* back */}
        <div className="glow-primary absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-cyan-300/30 bg-gradient-to-b from-cyan-400/[0.12] to-fuchsia-500/[0.08] p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm leading-snug font-medium text-foreground/95">{card.definition}</p>
          <p className="mt-2.5 border-t border-white/15 pt-2.5 text-xs italic text-muted-foreground">
            e.g. {card.example}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function Learning() {
  const { quizAnswers, flashcardsLearned } = useLab();
  return (
    <section id="quiz" className="relative py-24 sm:py-32">
      <div className="aurora-blob left-[12%] top-[25%] h-72 w-72 bg-sky-600/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Prove It</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Test your <span className="text-gradient">instincts</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Eight decision challenges and five flashcards. Every answer comes with
            the reasoning — that's where the learning lives.
          </p>
        </div>

        <div className="mb-8 mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-muted-foreground">
          <BrainCircuit className="h-4 w-4 text-emerald-300" />
          Score so far: {Object.keys(quizAnswers).length}/{QUIZZES.length} challenges ·{" "}
          {flashcardsLearned.length}/{FLASHCARDS.length} cards learned
        </div>

        <div className="mx-auto mb-16 grid max-w-6xl gap-4 md:grid-cols-2">
          {QUIZZES.map((q, i) => (
            <QuizCard key={q.id} quiz={q} index={i} />
          ))}
        </div>

        <h3 className="mb-6 text-center text-xl font-bold">Flashcards</h3>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FLASHCARDS.map((c, i) => (
            <FlashCard key={c.term} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
