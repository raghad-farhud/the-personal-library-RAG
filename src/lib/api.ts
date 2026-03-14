import type {
  PdfUploadPayload,
  QuotePayload,
  InsightPayload,
  NotePayload,
  AskPayload,
  AskResponse,
} from "@/types";
import { MOCK_ASK_RESPONSE, MOCK_INGESTION_DELAY, MOCK_ASK_DELAY, USE_MOCK } from "./mock-data";

const isDev = import.meta.env.DEV;

/** In development, use proxy paths to avoid CORS when calling n8n webhooks. */
function resolveUrl(configured: string, proxyPath: "/api/ask" | "/api/ingest"): string {
  return isDev ? proxyPath : configured;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitPdf(
  url: string,
  payload: PdfUploadPayload,
): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK) {
    await delay(MOCK_INGESTION_DELAY);
    return { success: true, message: "PDF uploaded successfully (mock)" };
  }

  const formData = new FormData();
  formData.append("source_type", payload.source_type);
  formData.append("title", payload.title);
  formData.append("author", payload.author);
  formData.append("language", payload.language);
  formData.append("tags", JSON.stringify(payload.tags));
  formData.append("category", payload.category);
  formData.append("date_read", payload.date_read);
  formData.append("favorite", String(payload.favorite));
  formData.append("notes", payload.notes);
  formData.append("file", payload.file);

  const resolved = resolveUrl(url, "/api/ingest");
  const res = await fetch(resolved, { method: "POST", body: formData });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return { success: true, message: "PDF uploaded successfully" };
}

export async function submitJson<
  T extends QuotePayload | InsightPayload | NotePayload,
>(
  url: string,
  payload: T,
): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK) {
    await delay(MOCK_INGESTION_DELAY);
    return { success: true, message: `${payload.source_type} saved successfully (mock)` };
  }

  const resolved = resolveUrl(url, "/api/ingest");
  const res = await fetch(resolved, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Submission failed: ${res.statusText}`);
  return { success: true, message: `${payload.source_type} saved successfully` };
}

function normalizeConfidence(
  raw: unknown,
): "high" | "medium" | "low" | undefined {
  if (raw === "high" || raw === "medium" || raw === "low") return raw;
  const n = typeof raw === "string" ? parseFloat(raw) : typeof raw === "number" ? raw : NaN;
  if (isNaN(n)) return undefined;
  if (n >= 0.75) return "high";
  if (n >= 0.4) return "medium";
  return "low";
}

export async function askLibrary(
  url: string,
  payload: AskPayload,
): Promise<AskResponse> {
  if (USE_MOCK) {
    await delay(MOCK_ASK_DELAY);
    return MOCK_ASK_RESPONSE;
  }

  const resolved = resolveUrl(url, "/api/ask");
  const res = await fetch(resolved, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Query failed: ${res.statusText}`);

  const raw = await res.text();
  console.log("[askLibrary] raw response:", raw);

  let json: Record<string, unknown>;
  try {
    let parsed: unknown = JSON.parse(raw);
    while (Array.isArray(parsed)) parsed = parsed[0];
    if (typeof parsed === "string") parsed = JSON.parse(parsed);
    json = (parsed as Record<string, unknown>) ?? {};
  } catch {
    throw new Error(`Invalid response from webhook: ${raw.slice(0, 200)}`);
  }

  if (json.output && typeof json.output === "object" && "answer" in (json.output as object)) {
    json = json.output as Record<string, unknown>;
  }

  return {
    answer: (json.answer as string) ?? "No answer returned.",
    confidence: normalizeConfidence(json.confidence),
    sources: Array.isArray(json.sources) ? json.sources : [],
  };
}

export async function testWebhook(url: string): Promise<boolean> {
  if (USE_MOCK) {
    await delay(800);
    return url.trim().length > 0;
  }

  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
    return res.ok || res.status === 405;
  } catch {
    return false;
  }
}
