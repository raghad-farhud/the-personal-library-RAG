import type { AskResponse } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { SourceCard } from "@/components/results/SourceCard";

const confidenceVariantMap = {
  high: "success" as const,
  medium: "warning" as const,
  low: "info" as const,
} satisfies Record<NonNullable<AskResponse["confidence"]>, "success" | "warning" | "info">;

interface AnswerPanelProps {
  response: AskResponse;
}

export function AnswerPanel({ response }: AnswerPanelProps) {
  const confidenceVariant =
    response.confidence != null
      ? confidenceVariantMap[response.confidence]
      : null;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-warm-900 text-xl font-medium">
            Answer
          </h2>
          {confidenceVariant != null && response.confidence && (
            <Badge variant={confidenceVariant}>
              {response.confidence.charAt(0).toUpperCase() +
                response.confidence.slice(1)}
            </Badge>
          )}
        </div>

        <p
          className={[
            "font-sans text-warm-700 text-base leading-relaxed",
            "md:text-lg",
            "max-w-prose",
          ].join(" ")}
        >
          {response.answer}
        </p>
      </section>

      <hr className="border-t border-warm-200" />

      {response.sources.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="font-serif text-warm-800 text-lg font-medium">
            Sources
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {response.sources.map((source, index) => (
              <SourceCard key={index} source={source} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
