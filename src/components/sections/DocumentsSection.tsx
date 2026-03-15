import { useState } from "react";
import { RefreshCw, AlertCircle, Database, Star, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Document } from "@/hooks/useDocuments";

const PDF_TYPES = ["book_pdf", "article_pdf"];

function isClickable(doc: Document): boolean {
  return !PDF_TYPES.includes(doc.source_type) && !!doc.content_text;
}

interface DocumentsSectionProps {
  documents: Document[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

function parseTags(raw: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TYPE_LABELS: Record<string, string> = {
  book_pdf: "Book",
  article_pdf: "Article",
  quote: "Quote",
  insight: "Insight",
  note: "Note",
};

function DocumentsSection({
  documents,
  loading,
  error,
  onRefresh,
}: DocumentsSectionProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Documents in Library
          </h2>
          <span className="text-sm text-muted-foreground">
            ({documents.length})
          </span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-lg p-3 mb-4">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && documents.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p>Loading documents...</p>
        </div>
      ) : documents.length === 0 && !error ? (
        <div className="text-center py-12 text-muted-foreground">
          <Database className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p>No documents yet. Upload something to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Title
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Author
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Type
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Category
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Language
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap text-center">
                  Fav
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Tags
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  Date Read
                </th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">
                  File
                </th>
                <th className="pb-3 font-medium text-muted-foreground whitespace-nowrap">
                  Added
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={isClickable(doc) ? () => setSelectedDoc(doc) : undefined}
                  className={`border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors ${
                    isClickable(doc) ? "cursor-pointer" : ""
                  }`}
                >
                  <td className="py-3 pr-4 font-medium text-foreground max-w-[200px] truncate">
                    {doc.title || "—"}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                    {doc.author || "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="info">
                      {TYPE_LABELS[doc.source_type] ?? doc.source_type}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                    {doc.category || "—"}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                    {doc.language || "—"}
                  </td>
                  <td className="py-3 pr-4 text-center">
                    {doc.favorite ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 inline-block" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {parseTags(doc.tags).map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                    {formatDate(doc.date_read)}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground max-w-[160px] truncate text-xs">
                    {doc.original_file_name || "—"}
                  </td>
                  <td className="py-3 text-muted-foreground whitespace-nowrap text-xs">
                    {formatDate(doc.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 pb-4 border-b border-border/50">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedDoc.title || "Untitled"}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info">
                    {TYPE_LABELS[selectedDoc.source_type] ?? selectedDoc.source_type}
                  </Badge>
                  {selectedDoc.author && (
                    <span className="text-sm text-muted-foreground">
                      by {selectedDoc.author}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto"
              dir={/^[\u0600-\u06FF]/.test(selectedDoc.content_text ?? "") ? "rtl" : "ltr"}
            >
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                {selectedDoc.content_text}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export { DocumentsSection };
