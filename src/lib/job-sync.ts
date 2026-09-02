import { fieldCodeReady, loadFieldCode } from "@/lib/crew-code";
import {
  loadDraft,
  loadEstimateLog,
  replaceEstimateLog,
  saveDraft,
  type EstimateDraft,
  type SavedEstimate,
} from "@/lib/estimate-log";
import {
  deleteCloudJob,
  pullCloudDraft,
  pullCloudJobs,
  pushCloudDraft,
  pushCloudJob,
} from "@/lib/job-cloud";

function mergeJobs(local: SavedEstimate[], remote: SavedEstimate[]) {
  const map = new Map<string, SavedEstimate>();
  for (const item of [...local, ...remote]) {
    const existing = map.get(item.id);
    if (!existing || item.savedAt > existing.savedAt) map.set(item.id, item);
  }
  return [...map.values()].sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function syncJobsFromCloud(fieldCode = loadFieldCode()) {
  if (!fieldCodeReady(fieldCode)) return loadEstimateLog();
  try {
    const result = await pullCloudJobs({ data: { fieldCode } });
    if (!result.ok) return loadEstimateLog();
    const local = loadEstimateLog();
    const merged = mergeJobs(local, result.jobs);
    replaceEstimateLog(merged);
    const remoteIds = new Set(result.jobs.map((item) => item.id));
    await Promise.all(
      merged
        .filter((item) => !remoteIds.has(item.id) || local.some((row) => row.id === item.id && row.savedAt >= item.savedAt))
        .map((item) => pushCloudJob({ data: { fieldCode, job: item } }).catch(() => null)),
    );
    return merged;
  } catch {
    return loadEstimateLog();
  }
}

export async function pushJobToCloud(job: SavedEstimate, fieldCode = loadFieldCode()) {
  if (!fieldCodeReady(fieldCode)) return;
  try {
    await pushCloudJob({ data: { fieldCode, job } });
  } catch {
    /* stay local */
  }
}

export async function deleteJobFromCloud(id: string, fieldCode = loadFieldCode()) {
  if (!fieldCodeReady(fieldCode)) return;
  try {
    await deleteCloudJob({ data: { fieldCode, id } });
  } catch {
    /* stay local */
  }
}

export async function syncDraftFromCloud(fieldCode = loadFieldCode()): Promise<EstimateDraft | null> {
  const local = loadDraft();
  if (!fieldCodeReady(fieldCode)) return local;
  try {
    const result = await pullCloudDraft({ data: { fieldCode } });
    if (!result.ok) return local;
    if (!local) return result.draft;
    if (!result.draft) {
      await pushCloudDraft({ data: { fieldCode, draft: local } }).catch(() => null);
      return local;
    }
    return local;
  } catch {
    return local;
  }
}

export async function pushDraftToCloud(draft: EstimateDraft, fieldCode = loadFieldCode()) {
  saveDraft(draft);
  if (!fieldCodeReady(fieldCode)) return;
  try {
    await pushCloudDraft({ data: { fieldCode, draft } });
  } catch {
    /* stay local */
  }
}
