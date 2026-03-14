import type { SourceResult } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

function formatSourceType(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

interface SourceCardProps {
  source: SourceResult;
}

export function SourceCard({ source }: SourceCardProps) {
  const scorePercent =
    source.score != null ? Math.round(source.score * 100) : null;

  return (
    <article
      className={cn(
        "relative rounded-xl border border-border/50 bg-card",
        "border-l-4 border-l-primary",
        "transition-shadow duration-200 hover:shadow-md",
        "overflow-hidden",
      )}
    >
      <div className="p-4">
        {scorePercent != null && (
          <span
            className="absolute top-3 right-3 rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary"
            aria-label={`Relevance: ${scorePercent}%`}
          >
            {scorePercent}%
          </span>
        )}

        <h3 className="text-foreground font-medium pr-12">
          {source.title}
        </h3>
        {source.author && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {source.author}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="default" className="text-xs">
            {formatSourceType(source.source_type)}
          </Badge>
          {source.page != null && (
            <span className="text-xs text-muted-foreground">p. {source.page}</span>
          )}
        </div>

        {source.snippet && (
          <blockquote
            className={cn(
              "mt-3 rounded-lg bg-muted/60 px-3 py-2.5",
              "border-l-2 border-l-secondary/30",
              "text-muted-foreground italic text-sm leading-relaxed",
            )}
          >
            &ldquo;{source.snippet}&rdquo;
          </blockquote>
        )}
      </div>
    </article>
  );
}
