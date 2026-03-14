import type { WebhookConfig } from "@/types";

const STORAGE_KEY = "library-mind-config";

function getDefaultConfig(): WebhookConfig {
  return {
    ingestionUrl: import.meta.env.VITE_INGEST_WEBHOOK_URL ?? "",
    askUrl: import.meta.env.VITE_ASK_WEBHOOK_URL ?? "",
  };
}

export function loadConfig(): WebhookConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultConfig();
    return { ...getDefaultConfig(), ...JSON.parse(raw) };
  } catch {
    return getDefaultConfig();
  }
}

export function saveConfig(config: WebhookConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Session storage for form drafts (survives refresh, cleared when tab closes)
const SESSION_PREFIX = "library-session-";

export function loadSessionForm<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(SESSION_PREFIX + key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

export function saveSessionForm(key: string, data: unknown): void {
  try {
    sessionStorage.setItem(SESSION_PREFIX + key, JSON.stringify(data));
  } catch {
    // ignore quota / private mode
  }
}

export function clearSessionForm(key: string): void {
  sessionStorage.removeItem(SESSION_PREFIX + key);
}
