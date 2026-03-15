import { useCallback, useEffect } from "react";
import { IngestionSection } from "@/components/sections/IngestionSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { DocumentsSection } from "@/components/sections/DocumentsSection";
import { useWebhookConfig } from "@/hooks/useWebhookConfig";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useDocuments } from "@/hooks/useDocuments";

export function LibraryPage() {
  const { config, updateConfig, resetConfig } = useWebhookConfig();
  const { stats, recordUpload, setEndpointStatus } = useDashboardStats();
  const { documents, loading, error, refetch } = useDocuments();

  useEffect(() => {
    setEndpointStatus(
      config.ingestionUrl.trim().length > 0,
      config.askUrl.trim().length > 0,
    );
  }, [config, setEndpointStatus]);

  const handleIngestionSuccess = useCallback(() => {
    recordUpload("upload");
    refetch();
  }, [recordUpload, refetch]);

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl text-foreground">
          Your Library
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your documents, quotes, insights, and notes.
        </p>
      </header>
      <DocumentsSection
        documents={documents}
        loading={loading}
        error={error}
        onRefresh={refetch}
      />
    </div>
  );
}
