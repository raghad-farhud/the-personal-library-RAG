import { User, BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Message, SourceResult } from "@/types";
import { SourceCard } from "@/components/results/SourceCard";
import { Badge } from "@/components/ui/Badge";

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

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-rose-100 text-rose-500"
            : "bg-cream-200 text-warm-600",
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <BookOpen className="h-4 w-4" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[75%] space-y-3",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-rose-50 text-warm-800"
              : "rounded-tl-sm bg-white text-warm-700 shadow-sm border border-warm-100",
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && meta.confidence && (
          <Badge variant={confidenceVariantMap[meta.confidence]}>
            {meta.confidence.charAt(0).toUpperCase() + meta.confidence.slice(1)} confidence
          </Badge>
        )}

        {!isUser && meta.sources && meta.sources.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-warm-500">Sources</p>
            <div className="">
              {meta.sources.map((source, i) => (
                <SourceCard key={i} source={source} />
              ))}
            </div>
          </div>
        )}

        <p className={cn(
          "text-[11px] text-warm-400",
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
