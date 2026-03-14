import { useState } from "react";
import { Settings } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { testWebhook } from "@/lib/api";
import type { WebhookConfig } from "@/types";

interface SettingsSectionProps {
  config: WebhookConfig;
  onConfigChange: (config: WebhookConfig) => void;
  onReset: () => void;
}

type TestState = "idle" | "testing" | "success" | "fail";

export function SettingsSection({
  config,
  onConfigChange,
  onReset,
}: SettingsSectionProps) {
  const [ingestionUrl, setIngestionUrl] = useState(config.ingestionUrl);
  const [askUrl, setAskUrl] = useState(config.askUrl);
  const [ingestionTest, setIngestionTest] = useState<TestState>("idle");
  const [askTest, setAskTest] = useState<TestState>("idle");

  function save() {
    onConfigChange({ ingestionUrl: ingestionUrl.trim(), askUrl: askUrl.trim() });
  }

  async function handleTestIngestion() {
    setIngestionTest("testing");
    const ok = await testWebhook(ingestionUrl.trim());
    setIngestionTest(ok ? "success" : "fail");
  }

  async function handleTestAsk() {
    setAskTest("testing");
    const ok = await testWebhook(askUrl.trim());
    setAskTest(ok ? "success" : "fail");
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-rose-400" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl text-warm-900">Settings</h2>
      </div>

      <Card>
        <div className="space-y-5">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Ingestion Webhook URL"
                value={ingestionUrl}
                onChange={(e) => setIngestionUrl(e.target.value)}
                onBlur={save}
                placeholder="https://your-n8n-instance.com/webhook/ingest"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestIngestion}
                loading={ingestionTest === "testing"}
                disabled={!ingestionUrl.trim()}
              >
                Test
              </Button>
              <TestBadge state={ingestionTest} />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Ask Webhook URL"
                value={askUrl}
                onChange={(e) => setAskUrl(e.target.value)}
                onBlur={save}
                placeholder="https://your-n8n-instance.com/webhook/ask"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestAsk}
                loading={askTest === "testing"}
                disabled={!askUrl.trim()}
              >
                Test
              </Button>
              <TestBadge state={askTest} />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-warm-200 pt-4">
            <p className="text-xs text-warm-400">
              Webhook URLs are stored locally in your browser.
            </p>
            <Button variant="secondary" size="sm" onClick={onReset}>
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

function TestBadge({ state }: { state: TestState }) {
  if (state === "idle" || state === "testing") return null;
  return (
    <Badge variant={state === "success" ? "success" : "info"}>
      {state === "success" ? "OK" : "Fail"}
    </Badge>
  );
}
