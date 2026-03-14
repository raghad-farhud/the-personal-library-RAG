import { useCallback, useEffect } from "react";
import { IngestionSection } from "@/components/sections/IngestionSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { useWebhookConfig } from "@/hooks/useWebhookConfig";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function UploadPage() {
  const { config, updateConfig, resetConfig } = useWebhookConfig();
  const { stats, recordUpload, setEndpointStatus } = useDashboardStats();

  useEffect(() => {
    setEndpointStatus(
      config.ingestionUrl.trim().length > 0,
      config.askUrl.trim().length > 0,
    );
  }, [config, setEndpointStatus]);

  const handleIngestionSuccess = useCallback(() => {
    recordUpload("upload");
  }, [recordUpload]);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl text-foreground">
          Add to Your Library
        </h1>
        <p className="mt-2 text-muted-foreground">
          Upload documents, save quotes, capture insights, or jot down notes.
        </p>
      </header>

      <DashboardSection stats={stats} />

      <IngestionSection
        webhookUrl={config.ingestionUrl}
        onSuccess={handleIngestionSuccess}
      />
    </div>
  );
}
