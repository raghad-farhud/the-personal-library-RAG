import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Message, SourceResult } from "@/types";
import { SourceCard } from "@/components/results/SourceCard";
import { Badge } from "@/components/ui/Badge";
import { User, Robot } from "pixelarticons/react";


interface ChatMessageProps {
  message: Message;
}

const confidenceVariantMap = {
  high: "success" as const,
  medium: "warning" as const,
  low: "info" as const,
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const meta = message.metadata as {
    confidence?: "high" | "medium" | "low";
    sources?: SourceResult[];
  };
  const sources = meta.sources ?? [];
  const [sourceIndex, setSourceIndex] = useState(0);
  const hasMultipleSources = sources.length > 1;
  const clampedIndex = Math.min(sourceIndex, Math.max(0, sources.length - 1));
  const currentSource = sources[clampedIndex];

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center border justify-center rounded-full",
          isUser
            ? "bg-primary/10 text-primary border-primary"
            : "bg-muted text-muted-foreground border-muted-foreground",
        )}
      >
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Robot className="h-5 w-5" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] space-y-3",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary/5 text-foreground"
              : "rounded-tl-sm bg-card text-card-foreground shadow-sm border border-border",
          )}
        >
          <p className="whitespace-pre-wrap"
          dir={/^[\u0600-\u06FF]/.test(message.content ?? "") ? "rtl" : "ltr"}>{message.content}</p>
        </div>

        {!isUser && meta.confidence && (
          <Badge variant={confidenceVariantMap[meta.confidence]}>
            {meta.confidence.charAt(0).toUpperCase() + meta.confidence.slice(1)} confidence
          </Badge>
        )}

        {!isUser && sources.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">Sources</p>
              {hasMultipleSources && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSourceIndex((i) => (i <= 0 ? sources.length - 1 : i - 1))}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Previous source"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3ch] text-center text-xs text-muted-foreground">
                    {clampedIndex + 1} / {sources.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSourceIndex((i) => (i >= sources.length - 1 ? 0 : i + 1))}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Next source"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="min-h-0">
              {currentSource && <SourceCard key={clampedIndex} source={currentSource} />}
            </div>
          </div>
        )}

        <p className={cn(
          "text-[11px] text-muted-foreground",
          isUser ? "text-right" : "text-left",
        )}>
          {new Date(message.created_at).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
