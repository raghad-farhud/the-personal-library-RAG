import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface TagInputProps {
  label?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  label,
  tags,
  onChange,
  placeholder = "Add a tag…",
  className,
}: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(raw: string) {
    const value = raw.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setInput("");
  }

  function removeTag(index: number) {
    onChange(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="font-serif text-sm text-warm-600">{label}</span>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-xl border border-warm-200 bg-white px-3 py-2",
          "focus-within:ring-2 focus-within:ring-rose-300 focus-within:border-rose-300",
          "transition-all",
        )}
      >
        {tags.map((tag, i) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-0.5 text-xs font-sans text-rose-500"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="rounded-full p-0.5 text-warm-500 hover:text-rose-500 hover:bg-rose-200 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[80px] bg-transparent text-sm text-warm-900 font-sans placeholder:text-warm-400 outline-none"
        />
      </div>
    </div>
  );
}
