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
            className="text-sm text-muted-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[120px] resize-y rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "transition-all",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-primary focus:ring-ring focus:border-ring",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-primary">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
