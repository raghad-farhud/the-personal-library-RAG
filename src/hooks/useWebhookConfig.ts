import { useState, useEffect, useCallback } from "react";
import type { WebhookConfig } from "@/types";
import { loadConfig, saveConfig, clearConfig } from "@/lib/storage";

export function useWebhookConfig() {
  const [config, setConfig] = useState<WebhookConfig>(() => loadConfig());

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const updateConfig = useCallback((newConfig: WebhookConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  }, []);

  const resetConfig = useCallback(() => {
    clearConfig();
    setConfig(loadConfig());
  }, []);

  return { config, updateConfig, resetConfig };
}
