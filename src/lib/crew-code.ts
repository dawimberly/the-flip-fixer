const CREW_KEY = "flipfixer.field-code.v1";

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadFieldCode(): string {
  if (!canUseStorage()) return "";
  try {
    return (localStorage.getItem(CREW_KEY) ?? "").trim();
  } catch {
    return "";
  }
}

export function saveFieldCode(value: string) {
  if (!canUseStorage()) return;
  const next = value.trim();
  if (!next) localStorage.removeItem(CREW_KEY);
  else localStorage.setItem(CREW_KEY, next);
}

export function fieldCodeReady(value = loadFieldCode()) {
  return value.trim().length >= 4;
}
