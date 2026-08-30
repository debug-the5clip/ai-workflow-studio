"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Turso integration — server-side Convex actions.
 *
 * All Turso auth lives behind Convex secrets so the browser never sees
 * TURSO_AUTH_TOKEN.  The two env vars must be set in the Convex dashboard
 * under Settings → Environment Variables:
 *   TURSO_DATABASE_URL   – the libSQL URL from your Turso dashboard
 *   TURSO_AUTH_TOKEN     – an auth token with read/write permissions
 *
 * The schema managed here (workflow_history) is separate from the Convex
 * schema — it lives entirely inside the Turso/libSQL database so it can
 * be queried at the edge with ultra-low latency.
 */

// ─── internal helper ────────────────────────────────────────────────────────

async function getTursoClient() {
  // Dynamic import so the module isn't bundled into the Convex frontend
  const { createClient } = await import("@libsql/client");

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error(
      "Turso is not configured. Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN " +
        "to your Convex environment variables (Settings → Environment Variables).",
    );
  }

  return createClient({ url, authToken });
}

/** Run once on first use to ensure the table exists. */
async function ensureSchema(client: Awaited<ReturnType<typeof getTursoClient>>) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS workflow_history (
      id          TEXT PRIMARY KEY,
      user_id     TEXT NOT NULL,
      use_case_id TEXT NOT NULL,
      use_case_title TEXT NOT NULL,
      category    TEXT NOT NULL DEFAULT '',
      completed_steps INTEGER NOT NULL DEFAULT 0,
      total_steps     INTEGER NOT NULL DEFAULT 8,
      status      TEXT NOT NULL DEFAULT 'in_progress',
      result_json TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  await client.execute(`
    CREATE INDEX IF NOT EXISTS idx_workflow_history_user
      ON workflow_history(user_id);
  `);
}

// ─── exported actions ───────────────────────────────────────────────────────

/** Save a new workflow run to Turso. */
export const saveWorkflow = action({
  args: {
    userId: v.string(),
    workflowId: v.string(),
    useCaseId: v.string(),
    useCaseTitle: v.string(),
    category: v.string(),
    completedSteps: v.number(),
    totalSteps: v.number(),
    status: v.string(),
    resultJson: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const client = await getTursoClient();
    await ensureSchema(client);

    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO workflow_history
              (id, user_id, use_case_id, use_case_title, category,
               completed_steps, total_steps, status, result_json,
               created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              completed_steps = excluded.completed_steps,
              total_steps     = excluded.total_steps,
              status          = excluded.status,
              result_json     = excluded.result_json,
              updated_at      = excluded.updated_at`,
      args: [
        args.workflowId,
        args.userId,
        args.useCaseId,
        args.useCaseTitle,
        args.category,
        args.completedSteps,
        args.totalSteps,
        args.status,
        args.resultJson ?? null,
        now,
        now,
      ],
    });

    return { ok: true as const };
  },
});

/** Load all workflows for a user. */
export const loadWorkflows = action({
  args: { userId: v.string() },
  handler: async (_ctx, args) => {
    const client = await getTursoClient();
    await ensureSchema(client);

    const result = await client.execute({
      sql: `SELECT * FROM workflow_history
            WHERE user_id = ?
            ORDER BY updated_at DESC
            LIMIT 50`,
      args: [args.userId],
    });

    return result.rows.map((row) => ({
      id: String(row.id),
      useCaseId: String(row.use_case_id),
      useCaseTitle: String(row.use_case_title),
      category: String(row.category),
      completedSteps: Number(row.completed_steps),
      totalSteps: Number(row.total_steps),
      status: String(row.status),
      resultJson: row.result_json ? String(row.result_json) : null,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
  },
});

/** Delete a single workflow run. */
export const deleteWorkflow = action({
  args: { workflowId: v.string() },
  handler: async (_ctx, args) => {
    const client = await getTursoClient();
    await ensureSchema(client);

    await client.execute({
      sql: `DELETE FROM workflow_history WHERE id = ?`,
      args: [args.workflowId],
    });

    return { ok: true as const };
  },
});

/** Count completed workflows for a user (for stats). */
export const getStats = action({
  args: { userId: v.string() },
  handler: async (_ctx, args) => {
    const client = await getTursoClient();
    await ensureSchema(client);

    const total = await client.execute({
      sql: `SELECT COUNT(*) as cnt FROM workflow_history WHERE user_id = ?`,
      args: [args.userId],
    });

    const completed = await client.execute({
      sql: `SELECT COUNT(*) as cnt FROM workflow_history
            WHERE user_id = ? AND status = 'completed'`,
      args: [args.userId],
    });

    return {
      total: Number(total.rows[0]?.cnt ?? 0),
      completed: Number(completed.rows[0]?.cnt ?? 0),
    };
  },
});
