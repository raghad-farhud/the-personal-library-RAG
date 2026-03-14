import type {
  PdfUploadPayload,
  QuotePayload,
  InsightPayload,
  NotePayload,
  AskPayload,
  AskResponse,
} from "@/types";
import { MOCK_ASK_RESPONSE, MOCK_INGESTION_DELAY, MOCK_ASK_DELAY, USE_MOCK } from "./mock-data";

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

  const res = await fetch(url, { method: "POST", body: formData });
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

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Submission failed: ${res.statusText}`);
  return { success: true, message: `${payload.source_type} saved successfully` };
}

export async function askLibrary(
  url: string,
  payload: AskPayload,
): Promise<AskResponse> {
  if (USE_MOCK) {
    await delay(MOCK_ASK_DELAY);
    return MOCK_ASK_RESPONSE;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Query failed: ${res.statusText}`);
  return res.json();
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
