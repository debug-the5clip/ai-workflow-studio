/**
 * Turso client helpers — thin wrapper around the Convex actions
 * defined in src/convex/turso.ts.
 *
 * These functions are called from React hooks/components.
 * They delegate to Convex actions (which run server-side), so the
 * TURSO_AUTH_TOKEN never reaches the browser.
 */

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface WorkflowRecord {
  id: string;
  useCaseId: string;
  useCaseTitle: string;
  category: string;
  completedSteps: number;
  totalSteps: number;
  status: "in_progress" | "completed";
  resultJson: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStats {
  total: number;
  completed: number;
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

/**
 * React hook that exposes CRUD helpers for Turso-backed workflow history.
 *
 * Usage:
 *   const { save, remove, stats } = useTursoWorkflows(userId);
 *   await save({ ... });
 */
export function useTursoWorkflows(userId: string | null) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveMutation = useMutation((api as any).turso.saveWorkflow);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteMutation = useMutation((api as any).turso.deleteWorkflow);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statsMutation = useMutation((api as any).turso.getStats);

  const save = async (workflow: {
    workflowId: string;
    useCaseId: string;
    useCaseTitle: string;
    category: string;
    completedSteps: number;
    totalSteps: number;
    status: "in_progress" | "completed";
    resultJson?: string;
  }) => {
    if (!userId) return;
    return saveMutation({
      userId,
      ...workflow,
    });
  };

  const remove = async (workflowId: string) => {
    return deleteMutation({ workflowId });
  };

  const getStats = async (): Promise<WorkflowStats | null> => {
    if (!userId) return null;
    return statsMutation({ userId });
  };

  return { save, remove, getStats };
}
