import { BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";

interface HeaderSectionProps {
  ingestionConfigured: boolean;
  askConfigured: boolean;
}

function StatusDot({
  configured,
  label,
}: {
  configured: boolean;
  label: string;
}) {
  return (
    <div className="group relative flex items-center gap-1.5">
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          configured ? "bg-secondary" : "bg-muted-foreground/30",
        )}
      />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function HeaderSection({
  ingestionConfigured,
  askConfigured,
}: HeaderSectionProps) {
  return (
    <header className="pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
            <h1 className="text-4xl tracking-tight text-foreground">
              Library Mind
            </h1>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Search your books, quotes, and ideas — one calm place.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1 pt-2">
          <StatusDot configured={ingestionConfigured} label="Ingestion" />
          <StatusDot configured={askConfigured} label="Ask" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-12 bg-border" />
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="h-px w-12 bg-border" />
      </div>
    </header>
  );
}
