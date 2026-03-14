import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-serif text-sm text-warm-600"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[120px] resize-y rounded-xl border border-warm-200 bg-white px-4 py-2 text-sm text-warm-900 font-sans",
            "placeholder:text-warm-400",
            "transition-all",
            "focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-rose-400 focus:ring-rose-400 focus:border-rose-400",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
