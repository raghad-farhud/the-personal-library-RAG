import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { TagInput } from "@/components/ui/TagInput";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { submitJson } from "@/lib/api";
import { loadSessionForm, saveSessionForm, clearSessionForm } from "@/lib/storage";
import type { Language, QuotePayload } from "@/types";

const QUOTE_SESSION_KEY = "form-quote";

interface QuoteFormProps {
  webhookUrl: string;
  onSuccess?: () => void;
}

const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Mixed", label: "Mixed" },
];

const INITIAL_STATE = {
  content: "",
  title: "",
  author: "",
  language: "English" as Language,
  tags: [] as string[],
  theme: "",
  whySaved: "",
  favorite: false,
};

export function QuoteForm({ webhookUrl, onSuccess }: QuoteFormProps) {
  const [form, setForm] = useState(() =>
    loadSessionForm(QUOTE_SESSION_KEY, INITIAL_STATE)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { status, message, submit } = useFormSubmit();

  useEffect(() => {
    saveSessionForm(QUOTE_SESSION_KEY, form);
  }, [form]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.content.trim()) next.content = "Quote text is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload: QuotePayload = {
      source_type: "quote",
      content: form.content.trim(),
      title: form.title.trim(),
      author: form.author.trim(),
      language: form.language,
      tags: form.tags,
      theme: form.theme.trim(),
      why_saved: form.whySaved.trim(),
      favorite: form.favorite,
    };

    await submit(async () => {
      const result = await submitJson(webhookUrl, payload);
      if (result.success) {
        setTimeout(() => {
          setForm(INITIAL_STATE);
          clearSessionForm(QUOTE_SESSION_KEY);
          onSuccess?.();
        }, 600);
      }
      return result;
    });
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        label="Quote Text"
        value={form.content}
        onChange={(e) => set("content", e.target.value)}
        error={errors.content}
        placeholder="Enter the quote..."
        rows={4}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Source Title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Book or article title"
          disabled={isLoading}
        />

        <Input
          label="Quoted Author"
          value={form.author}
          onChange={(e) => set("author", e.target.value)}
          placeholder="Who said this?"
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
          label="Theme"
          value={form.theme}
          onChange={(e) => set("theme", e.target.value)}
          placeholder="e.g., Stoicism, Creativity"
          disabled={isLoading}
        />
      </div>

      <TagInput
        label="Tags"
        tags={form.tags}
        onChange={(tags) => set("tags", tags)}
        placeholder="Add a tag and press Enter"
      />

      <Textarea
        label="Why I saved this"
        value={form.whySaved}
        onChange={(e) => set("whySaved", e.target.value)}
        placeholder="What makes this quote meaningful to you?"
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
          Save Quote
        </Button>
      </div>
    </form>
  );
}
