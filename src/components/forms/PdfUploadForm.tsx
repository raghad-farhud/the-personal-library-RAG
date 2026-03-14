import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { TagInput } from "@/components/ui/TagInput";
import { FileUpload } from "@/components/ui/FileUpload";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { submitPdf } from "@/lib/api";
import { loadSessionForm, saveSessionForm, clearSessionForm } from "@/lib/storage";
import type { SourceType, Language, PdfUploadPayload } from "@/types";

const PDF_SESSION_KEY = "form-pdf";

interface PdfUploadFormProps {
  webhookUrl: string;
  onSuccess?: () => void;
}

const SOURCE_TYPE_OPTIONS = [
  { value: "book_pdf", label: "Book PDF" },
  { value: "article_pdf", label: "Article PDF" },
];

const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Mixed", label: "Mixed" },
];

const INITIAL_STATE = {
  sourceType: "book_pdf" as SourceType,
  title: "",
  author: "",
  language: "English" as Language,
  tags: [] as string[],
  category: "",
  dateRead: "",
  favorite: false,
  notes: "",
  file: null as File | null,
};

export function PdfUploadForm({ webhookUrl, onSuccess }: PdfUploadFormProps) {
  const [form, setForm] = useState(() => ({
    ...INITIAL_STATE,
    ...loadSessionForm(PDF_SESSION_KEY, {}),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { status, message, submit } = useFormSubmit();

  useEffect(() => {
    const { file: _f, ...rest } = form;
    saveSessionForm(PDF_SESSION_KEY, rest);
  }, [form]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.author.trim()) next.author = "Author is required";
    if (!form.file) next.file = "Please select a PDF file";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload: PdfUploadPayload = {
      source_type: form.sourceType,
      title: form.title.trim(),
      author: form.author.trim(),
      language: form.language,
      tags: form.tags,
      category: form.category.trim(),
      date_read: form.dateRead,
      favorite: form.favorite,
      notes: form.notes.trim(),
      file: form.file!,
    };

    await submit(async () => {
      const result = await submitPdf(webhookUrl, payload);
      if (result.success) {
        setTimeout(() => {
          setForm(INITIAL_STATE);
          clearSessionForm(PDF_SESSION_KEY);
          onSuccess?.();
        }, 600);
      }
      return result;
    });
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          label="Source Type"
          options={SOURCE_TYPE_OPTIONS}
          value={form.sourceType}
          onChange={(e) => set("sourceType", e.target.value as SourceType)}
          disabled={isLoading}
        />

        <Select
          label="Language"
          options={LANGUAGE_OPTIONS}
          value={form.language}
          onChange={(e) => set("language", e.target.value as Language)}
          disabled={isLoading}
        />

        <Input
          label="Title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          error={errors.title}
          placeholder="Enter the title"
          disabled={isLoading}
        />

        <Input
          label="Author"
          value={form.author}
          onChange={(e) => set("author", e.target.value)}
          error={errors.author}
          placeholder="Enter the author"
          disabled={isLoading}
        />

        <Input
          label="Category / Genre"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          placeholder="e.g., Philosophy, Fiction"
          disabled={isLoading}
        />

        <Input
          label="Date Read"
          type="date"
          value={form.dateRead}
          onChange={(e) => set("dateRead", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <TagInput
        label="Tags"
        tags={form.tags}
        onChange={(tags) => set("tags", tags)}
        placeholder="Add a tag and press Enter"
      />

      <div className="space-y-1.5">
        <span className="font-serif text-sm text-warm-700">PDF File</span>
        <FileUpload
          accept=".pdf"
          selectedFile={form.file}
          onFileSelect={(file) => set("file", file)}
          onClear={() => set("file", null)}
        />
        {errors.file && <p className="text-xs text-rose-500">{errors.file}</p>}
      </div>

      <Textarea
        label="Optional Notes"
        value={form.notes}
        onChange={(e) => set("notes", e.target.value)}
        placeholder="Any notes about this source..."
        rows={3}
        disabled={isLoading}
      />

      <Toggle
        label="Mark as Favorite"
        checked={form.favorite}
        onChange={(checked) => set("favorite", checked)}
      />

      <StatusMessage type={status === "loading" ? "idle" : status} message={message} />

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="lg" loading={isLoading}>
          Upload PDF
        </Button>
      </div>
    </form>
  );
}
