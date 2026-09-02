import { createHash } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import type { EstimateDraft, SavedEstimate } from "@/lib/estimate-log";

function cloudReady() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function ownerKey(crewCode: string) {
  const normalized = crewCode.trim().toLowerCase();
  if (normalized.length < 4) {
    throw new Error("Field code must be at least 4 characters.");
  }
  return createHash("sha256").update(`flipfixer-field:${normalized}`).digest("hex");
}

function asJobs(rows: Array<{ id: string; saved_at: string; snapshot: unknown; summary: unknown }>): SavedEstimate[] {
  return rows.map((row) => ({
    id: row.id,
    savedAt: typeof row.saved_at === "string" ? row.saved_at : new Date(row.saved_at).toISOString(),
    snapshot: row.snapshot as SavedEstimate["snapshot"],
    summary: row.summary as SavedEstimate["summary"],
  }));
}

export const pullCloudJobs = createServerFn({ method: "POST" })
  .validator((data: { fieldCode: string }) => data)
  .handler(async ({ data }) => {
    if (!cloudReady()) return { ok: false as const, reason: "no-database", jobs: [] as SavedEstimate[] };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const key = ownerKey(data.fieldCode);
    const rows = await sql.query<{
      id: string;
      saved_at: string;
      snapshot: unknown;
      summary: unknown;
    }>("select id, saved_at, snapshot, summary from saved_jobs where owner_key = $1 order by saved_at desc", [key]);
    return { ok: true as const, reason: null, jobs: asJobs(rows) };
  });

export const pushCloudJob = createServerFn({ method: "POST" })
  .validator((data: { fieldCode: string; job: SavedEstimate }) => data)
  .handler(async ({ data }) => {
    if (!cloudReady()) return { ok: false as const, reason: "no-database" };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const key = ownerKey(data.fieldCode);
    await sql.query(
      `insert into saved_jobs (owner_key, id, saved_at, snapshot, summary)
       values ($1, $2, $3, $4::jsonb, $5::jsonb)
       on conflict (owner_key, id) do update set
         saved_at = excluded.saved_at,
         snapshot = excluded.snapshot,
         summary = excluded.summary`,
      [key, data.job.id, data.job.savedAt, JSON.stringify(data.job.snapshot), JSON.stringify(data.job.summary)],
    );
    return { ok: true as const, reason: null };
  });

export const deleteCloudJob = createServerFn({ method: "POST" })
  .validator((data: { fieldCode: string; id: string }) => data)
  .handler(async ({ data }) => {
    if (!cloudReady()) return { ok: false as const, reason: "no-database" };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const key = ownerKey(data.fieldCode);
    await sql.query("delete from saved_jobs where owner_key = $1 and id = $2", [key, data.id]);
    return { ok: true as const, reason: null };
  });

export const pullCloudDraft = createServerFn({ method: "POST" })
  .validator((data: { fieldCode: string }) => data)
  .handler(async ({ data }) => {
    if (!cloudReady()) return { ok: false as const, reason: "no-database", draft: null as EstimateDraft | null };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const key = ownerKey(data.fieldCode);
    const rows = await sql.query<{ draft: EstimateDraft }>("select draft from job_drafts where owner_key = $1", [key]);
    return { ok: true as const, reason: null, draft: rows[0]?.draft ?? null };
  });

export const pushCloudDraft = createServerFn({ method: "POST" })
  .validator((data: { fieldCode: string; draft: EstimateDraft }) => data)
  .handler(async ({ data }) => {
    if (!cloudReady()) return { ok: false as const, reason: "no-database" };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const key = ownerKey(data.fieldCode);
    await sql.query(
      `insert into job_drafts (owner_key, draft, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (owner_key) do update set draft = excluded.draft, updated_at = now()`,
      [key, JSON.stringify(data.draft)],
    );
    return { ok: true as const, reason: null };
  });
