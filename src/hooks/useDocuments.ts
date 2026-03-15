import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface Document {
  id: string;
  source_type: string;
  title: string;
  author: string;
  language: string;
  category: string;
  favorite: boolean;
  date_read: string;
  source_url: string;
  original_file_name: string;
  file_mime_type: string;
  why_saved: string;
  notes: string;
  created_at: string;
  updated_at: string;
  theme: string;
  related_source: string;
  source: string;
  tags: string;
  content_text?: string;
}

const PDF_TYPES = ["book_pdf", "article_pdf"];

const BASE_COLUMNS = [
  "id",
  "source_type",
  "title",
  "author",
  "language",
  "category",
  "favorite",
  "date_read",
  "source_url",
  "original_file_name",
  "file_mime_type",
  "why_saved",
  "notes",
  "created_at",
  "updated_at",
  "theme",
  "related_source",
  "source",
  "tags",
].join(",");

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [baseResult, contentResult] = await Promise.all([
      supabase
        .from("document_metadata")
        .select(BASE_COLUMNS)
        .order("created_at", { ascending: false }),
      supabase
        .from("document_metadata")
        .select("id,content_text")
        .not("source_type", "in", `(${PDF_TYPES.join(",")})`),
    ]);

    if (baseResult.error) {
      setError(baseResult.error.message);
      setDocuments([]);
      setLoading(false);
      return;
    }

    const contentMap = new Map<string, string>();
    if (!contentResult.error && contentResult.data) {
      for (const row of contentResult.data as { id: string; content_text: string }[]) {
        contentMap.set(row.id, row.content_text);
      }
    }

    const merged = (baseResult.data as unknown as Document[]).map((doc) => ({
      ...doc,
      content_text: contentMap.get(doc.id),
    }));

    setDocuments(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { documents, loading, error, refetch: fetchDocuments };
}
