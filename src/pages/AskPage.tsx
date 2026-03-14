import { useCallback, useEffect } from "react";
import { AskSection } from "@/components/sections/AskSection";
import { useWebhookConfig } from "@/hooks/useWebhookConfig";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function AskPage() {
  const { config } = useWebhookConfig();
  const { recordQuery, setEndpointStatus } = useDashboardStats();

  useEffect(() => {
    setEndpointStatus(
      config.ingestionUrl.trim().length > 0,
      config.askUrl.trim().length > 0,
    );
  }, [config, setEndpointStatus]);

  const handleQuerySubmit = useCallback(
    (query: string) => {
      recordQuery(query);
    },
    [recordQuery],
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-warm-900">
          Ask Your Library
        </h1>
        <p className="mt-2 text-warm-500">
          Query your books, notes, and collected wisdom.
        </p>
      </header>

      <AskSection
        webhookUrl={config.askUrl}
        onQuerySubmit={handleQuerySubmit}
      />
    </div>
  );
}
