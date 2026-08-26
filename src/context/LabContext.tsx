import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// ─── Lab-wide interaction state, persisted to localStorage ───────────────────

interface LabState {
  visitedSections: string[];
  completedUseCases: string[];
  quizAnswers: Record<string, number>;
  flashcardsLearned: string[];
  lastUseCaseId: string | null;
}

interface LabContextValue extends LabState {
  markSectionVisited: (id: string) => void;
  completeUseCase: (id: string) => void;
  answerQuiz: (id: string, index: number, correct: boolean) => void;
  learnFlashcard: (term: string) => void;
  setLastUseCase: (id: string | null) => void;
  progressPercent: number;
  resetProgress: () => void;
}

const STORAGE_KEY = "claude-marketing-lab-v1";

const DEFAULT_STATE: LabState = {
  visitedSections: [],
  completedUseCases: [],
  quizAnswers: {},
  flashcardsLearned: [],
  lastUseCaseId: null,
};

function loadState(): LabState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<LabState>) };
  } catch {
    return DEFAULT_STATE;
  }
}

const LabContext = createContext<LabContextValue | null>(null);

export function LabProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LabState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — state stays in-memory */
    }
  }, [state]);

  const markSectionVisited = useCallback((id: string) => {
    setState((s) =>
      s.visitedSections.includes(id)
        ? s
        : { ...s, visitedSections: [...s.visitedSections, id] },
    );
  }, []);

  const completeUseCase = useCallback((id: string) => {
    setState((s) =>
      s.completedUseCases.includes(id)
        ? s
        : { ...s, completedUseCases: [...s.completedUseCases, id], lastUseCaseId: id },
    );
  }, []);

  const answerQuiz = useCallback((id: string, _index: number, correct: boolean) => {
    setState((s) =>
      correct && !s.quizAnswers[id]
        ? { ...s, quizAnswers: { ...s.quizAnswers, [id]: Date.now() } }
        : s,
    );
  }, []);

  const learnFlashcard = useCallback((term: string) => {
    setState((s) =>
      s.flashcardsLearned.includes(term)
        ? s
        : { ...s, flashcardsLearned: [...s.flashcardsLearned, term] },
    );
  }, []);

  const setLastUseCase = useCallback((id: string | null) => {
    setState((s) => ({ ...s, lastUseCaseId: id }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  // Learning journey progress across the whole lab
  const progressPercent = useMemo(() => {
    let done = 0;
    if (state.visitedSections.includes("blocks")) done++;
    if (state.visitedSections.includes("usecases")) done++;
    if (state.completedUseCases.length > 0) done++;
    if (Object.keys(state.quizAnswers).length >= 4) done++;
    if (state.flashcardsLearned.length >= 5) done++;
    return Math.round((done / 5) * 100);
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      markSectionVisited,
      completeUseCase,
      answerQuiz,
      learnFlashcard,
      setLastUseCase,
      progressPercent,
      resetProgress,
    }),
    [state, markSectionVisited, completeUseCase, answerQuiz, learnFlashcard, setLastUseCase, progressPercent, resetProgress],
  );

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLab() {
  const ctx = useContext(LabContext);
  if (!ctx) throw new Error("useLab must be used inside <LabProvider>");
  return ctx;
}
