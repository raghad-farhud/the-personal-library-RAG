export type SourceType = "book_pdf" | "article_pdf";
export type Language = "English" | "Arabic" | "Mixed";
export type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface PdfUploadPayload {
  source_type: SourceType;
  title: string;
  author: string;
  language: Language;
  tags: string[];
  category: string;
  date_read: string;
  favorite: boolean;
  notes: string;
  file: File;
}

export interface QuotePayload {
  source_type: "quote";
  title: string;
  author: string;
  language: Language;
  tags: string[];
  theme: string;
  why_saved: string;
  content: string;
  favorite: boolean;
}

export interface InsightPayload {
  source_type: "insight";
  title: string;
  source: string;
  language: Language;
  tags: string[];
  category: string;
  content: string;
  favorite: boolean;
}

export interface NotePayload {
  source_type: "note";
  title: string;
  related_source: string;
  language: Language;
  tags: string[];
  category: string;
  content: string;
  favorite: boolean;
}

export interface AskPayload {
  question: string;
  source_type: string;
  language: string;
  author: string;
  title: string;
  favorites_only: boolean;
}

export interface SourceResult {
  title: string;
  author: string;
  page?: number;
  source_type: string;
  snippet: string;
  score?: number;
}

export interface AskResponse {
  answer: string;
  confidence?: "high" | "medium" | "low";
  sources: SourceResult[];
}

export interface WebhookConfig {
  ingestionUrl: string;
  askUrl: string;
}

export interface DashboardStats {
  uploadsToday: number;
  lastSourceType: string;
  lastQuery: string;
  ingestionConfigured: boolean;
  askConfigured: boolean;
}

/* ── Chat system ─────────────────────────────────── */

export interface Chat {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  chat_id: string;
  role: MessageRole;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}
