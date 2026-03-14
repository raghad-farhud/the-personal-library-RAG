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
import type { Language, NotePayload } from "@/types";

const NOTE_SESSION_KEY = "form-note";

interface NoteFormProps {
  webhookUrl: string;
  onSuccess?: () => void;
}

const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Mixed", label: "Mixed" },
];

const INITIAL_STATE = {
  title: "",
  content: "",
  relatedSource: "",
  language: "English" as Language,
  tags: [] as string[],
  category: "",
  favorite: false,
};

export function NoteForm({ webhookUrl, onSuccess }: NoteFormProps) {
  const [form, setForm] = useState(() =>
    loadSessionForm(NOTE_SESSION_KEY, INITIAL_STATE)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { status, message, submit } = useFormSubmit();

  useEffect(() => {
    saveSessionForm(NOTE_SESSION_KEY, form);
  }, [form]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.content.trim()) next.content = "Note content is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload: NotePayload = {
      source_type: "note",
      title: form.title.trim(),
      content: form.content.trim(),
      related_source: form.relatedSource.trim(),
      language: form.language,
      tags: form.tags,
      category: form.category.trim(),
      favorite: form.favorite,
    };

    await submit(async () => {
      const result = await submitJson(webhookUrl, payload);
      if (result.success) {
        setTimeout(() => {
          setForm(INITIAL_STATE);
          clearSessionForm(NOTE_SESSION_KEY);
          onSuccess?.();
        }, 600);
      }
      return result;
    });
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Note Title"
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
        error={errors.title}
        placeholder="Title for your note"
        disabled={isLoading}
      />

      <Textarea
        label="Note Content"
        value={form.content}
        onChange={(e) => set("content", e.target.value)}
        error={errors.content}
        placeholder="Write your note..."
        rows={5}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Related Book / Source"
          value={form.relatedSource}
          onChange={(e) => set("relatedSource", e.target.value)}
          placeholder="Which book or source is this about?"
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
          label="Category"
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          placeholder="e.g., Reading Notes, Research"
          disabled={isLoading}
        />
      </div>

      <TagInput
        label="Tags"
        tags={form.tags}
        onChange={(tags) => set("tags", tags)}
        placeholder="Add a tag and press Enter"
      />

      <Toggle
        label="Mark as Favorite"
        checked={form.favorite}
        onChange={(checked) => set("favorite", checked)}
      />

      <StatusMessage type={status === "loading" ? "idle" : status} message={message} />

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="lg" loading={isLoading}>
          Save Note
        </Button>
      </div>
    </form>
  );
}
