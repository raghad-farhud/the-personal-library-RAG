import { useState, useCallback } from "react";
import type { DashboardStats } from "@/types";

const DEFAULT_STATS: DashboardStats = {
  uploadsToday: 0,
  lastSourceType: "",
  lastQuery: "",
  ingestionConfigured: false,
  askConfigured: false,
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);

  const recordUpload = useCallback((sourceType: string) => {
    setStats((prev) => ({
      ...prev,
      uploadsToday: prev.uploadsToday + 1,
      lastSourceType: sourceType,
    }));
  }, []);

  const recordQuery = useCallback((query: string) => {
    setStats((prev) => ({
      ...prev,
      lastQuery: query,
    }));
  }, []);

  const setEndpointStatus = useCallback((ingestion: boolean, ask: boolean) => {
    setStats((prev) => ({
      ...prev,
      ingestionConfigured: ingestion,
      askConfigured: ask,
    }));
  }, []);

  return { stats, recordUpload, recordQuery, setEndpointStatus };
}
