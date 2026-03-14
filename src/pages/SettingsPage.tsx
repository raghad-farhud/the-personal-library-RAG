import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useWebhookConfig } from "@/hooks/useWebhookConfig";

export function SettingsPage() {
  const { config, updateConfig, resetConfig } = useWebhookConfig();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl text-warm-900">Settings</h1>
        <p className="mt-2 text-warm-500">
          Configure your webhook endpoints and preferences.
        </p>
      </header>

      <SettingsSection
        config={config}
        onConfigChange={updateConfig}
        onReset={resetConfig}
      />

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-warm-500 transition-colors hover:text-warm-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
