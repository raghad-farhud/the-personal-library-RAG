import { DemoBanner } from "@/components/layout/DemoBanner";
import { DocumentsSection } from "@/components/sections/DocumentsSection";
import type { Document } from "@/hooks/useDocuments";

const DEMO_DOCUMENTS: Document[] = [
  {
    id: "demo-1",
    source_type: "book_pdf",
    title: "Atomic Habits",
    author: "James Clear",
    language: "English",
    category: "Self-Help",
    favorite: true,
    date_read: "2025-12-15",
    source_url: "",
    original_file_name: "atomic-habits.pdf",
    file_mime_type: "application/pdf",
    why_saved: "",
    notes: "Great frameworks for habit formation",
    created_at: "2025-12-16T10:00:00Z",
    updated_at: "2025-12-16T10:00:00Z",
    theme: "",
    related_source: "",
    source: "",
    tags: '["habits","productivity","psychology"]',
  },
  {
    id: "demo-2",
    source_type: "quote",
    title: "On Reading",
    author: "Jorge Luis Borges",
    language: "English",
    category: "Literature",
    favorite: true,
    date_read: "2026-01-08",
    source_url: "",
    original_file_name: "",
    file_mime_type: "",
    why_saved: "Beautiful perspective on reading",
    notes: "",
    created_at: "2026-01-09T14:30:00Z",
    updated_at: "2026-01-09T14:30:00Z",
    theme: "Reading",
    related_source: "",
    source: "",
    tags: '["reading","literature"]',
    content_text:
      "I have always imagined that Paradise will be a kind of library.",
  },
  {
    id: "demo-3",
    source_type: "article_pdf",
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    language: "English",
    category: "AI Research",
    favorite: false,
    date_read: "2026-02-20",
    source_url: "",
    original_file_name: "attention-is-all-you-need.pdf",
    file_mime_type: "application/pdf",
    why_saved: "",
    notes: "Foundational transformer architecture paper",
    created_at: "2026-02-21T09:00:00Z",
    updated_at: "2026-02-21T09:00:00Z",
    theme: "",
    related_source: "",
    source: "",
    tags: '["AI","transformers","deep-learning"]',
  },
  {
    id: "demo-4",
    source_type: "insight",
    title: "Spaced Repetition for Learning",
    author: "",
    language: "English",
    category: "Learning",
    favorite: false,
    date_read: "2026-03-01",
    source_url: "",
    original_file_name: "",
    file_mime_type: "",
    why_saved: "",
    notes: "",
    created_at: "2026-03-02T11:15:00Z",
    updated_at: "2026-03-02T11:15:00Z",
    theme: "",
    related_source: "",
    source: "Personal research",
    tags: '["learning","memory"]',
    content_text:
      "Reviewing material at increasing intervals dramatically improves long-term retention. The optimal schedule follows an exponential curve.",
  },
  {
    id: "demo-5",
    source_type: "note",
    title: "Project Ideas for RAG Systems",
    author: "",
    language: "English",
    category: "Tech",
    favorite: true,
    date_read: "2026-03-15",
    source_url: "",
    original_file_name: "",
    file_mime_type: "",
    why_saved: "",
    notes: "",
    created_at: "2026-03-15T16:45:00Z",
    updated_at: "2026-03-15T16:45:00Z",
    theme: "",
    related_source: "Atomic Habits",
    source: "",
    tags: '["RAG","projects","AI"]',
    content_text:
      "Build a personal knowledge base that can answer questions across all saved documents, quotes, and notes using retrieval-augmented generation.",
  },
  {
    id: "demo-6",
    source_type: "quote",
    title: "في القراءة",
    author: "عباس محمود العقاد",
    language: "Arabic",
    category: "أدب",
    favorite: true,
    date_read: "2026-03-20",
    source_url: "",
    original_file_name: "",
    file_mime_type: "",
    why_saved: "حكمة جميلة عن القراءة",
    notes: "",
    created_at: "2026-03-20T08:00:00Z",
    updated_at: "2026-03-20T08:00:00Z",
    theme: "القراءة",
    related_source: "",
    source: "",
    tags: '["قراءة","أدب"]',
    content_text:
      "القراءة وحدها هي التي تُعطي الإنسان الواحد أكثر من حياة واحدة.",
  },
];

export function DemoLibraryPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl text-foreground">Your Library</h1>
        <p className="mt-2 text-muted-foreground">
          Your documents, quotes, insights, and notes.
        </p>
      </header>

      <DemoBanner />

      <DocumentsSection
        documents={DEMO_DOCUMENTS}
        loading={false}
        error={null}
        onRefresh={() => {}}
      />
    </div>
  );
}
