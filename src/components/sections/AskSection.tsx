import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { AnswerPanel } from "@/components/results/AnswerPanel";
import { askLibrary } from "@/lib/api";
import { loadSessionForm, saveSessionForm } from "@/lib/storage";
import type { AskPayload, AskResponse } from "@/types";

const ASK_SESSION_KEY = "ask-form";
const ASK_INITIAL = {
  question: "",
  sourceType: "",
  language: "",
  author: "",
  title: "",
  favoritesOnly: false,
  filtersOpen: false,
};

interface AskSectionProps {
  webhookUrl: string;
  onQuerySubmit?: (query: string) => void;
}

const SOURCE_TYPE_OPTIONS = [
  { value: "", label: "All sources" },
  { value: "book_pdf", label: "Book PDF" },
  { value: "article_pdf", label: "Article PDF" },
  { value: "quote", label: "Quote" },
  { value: "insight", label: "Insight" },
  { value: "note", label: "Note" },
];

const LANGUAGE_OPTIONS = [
  { value: "", label: "Any language" },
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Mixed", label: "Mixed" },
];

export function AskSection({ webhookUrl, onQuerySubmit }: AskSectionProps) {
  const [question, setQuestion] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).question
  );
  const [sourceType, setSourceType] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).sourceType
  );
  const [language, setLanguage] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).language
  );
  const [author, setAuthor] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).author
  );
  const [title, setTitle] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).title
  );
  const [favoritesOnly, setFavoritesOnly] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).favoritesOnly
  );
  const [filtersOpen, setFiltersOpen] = useState(() =>
    loadSessionForm(ASK_SESSION_KEY, ASK_INITIAL).filtersOpen
  );

  useEffect(() => {
    saveSessionForm(ASK_SESSION_KEY, {
      question,
      sourceType,
      language,
      author,
      title,
      favoritesOnly,
      filtersOpen,
    });
  }, [question, sourceType, language, author, title, favoritesOnly, filtersOpen]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<AskResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    const payload: AskPayload = {
      question: trimmed,
      source_type: sourceType,
      language,
      author: author.trim(),
      title: title.trim(),
      favorites_only: favoritesOnly,
    };

    try {
      const result = await askLibrary(webhookUrl, payload);
      setResponse(result);
      onQuerySubmit?.(trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What would you like to explore in your library?"
          className="min-h-[100px]"
        />

        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 text-sm font-sans text-warm-500 hover:text-rose-500 transition-colors"
          >
            {filtersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            Filters
          </button>

          {filtersOpen && (
            <div className="mt-3 grid grid-cols-1 gap-4 rounded-xl border border-warm-200 bg-cream-100/30 p-4 sm:grid-cols-2">
              <Select
                label="Source Type"
                options={SOURCE_TYPE_OPTIONS}
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
              />
              <Select
                label="Language"
                options={LANGUAGE_OPTIONS}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <Input
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Filter by author…"
              />
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Filter by title…"
              />
              <div className="flex items-end sm:col-span-2">
                <Toggle
                  label="Favorites only"
                  checked={favoritesOnly}
                  onChange={setFavoritesOnly}
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-rose-500">{error}</p>
        )}

        <Button type="submit" loading={loading} disabled={!question.trim()}>
          <Search className="h-4 w-4" />
          Search Library
        </Button>
      </form>

      {response && (
        <div className="mt-8">
          <AnswerPanel response={response} />
        </div>
      )}
    </div>
  );
}
