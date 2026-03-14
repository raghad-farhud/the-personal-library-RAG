import { useState, useEffect } from "react";
import { FileUp, Quote, Lightbulb, StickyNote } from "lucide-react";
import { TabList, TabPanel } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { loadSessionForm, saveSessionForm } from "@/lib/storage";
import { PdfUploadForm } from "@/components/forms/PdfUploadForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { InsightForm } from "@/components/forms/InsightForm";
import { NoteForm } from "@/components/forms/NoteForm";

interface IngestionSectionProps {
  webhookUrl: string;
  onSuccess?: () => void;
}

const TABS = [
  { id: "pdf", label: "Upload PDF", icon: <FileUp className="h-4 w-4" /> },
  { id: "quote", label: "Add Quote", icon: <Quote className="h-4 w-4" /> },
  {
    id: "insight",
    label: "Add Insight",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    id: "note",
    label: "Add Note",
    icon: <StickyNote className="h-4 w-4" />,
  },
];

const UPLOAD_TAB_KEY = "upload-active-tab";
const VALID_TAB_IDS = ["pdf", "quote", "insight", "note"];

export function IngestionSection({
  webhookUrl,
  onSuccess,
}: IngestionSectionProps) {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = loadSessionForm(UPLOAD_TAB_KEY, { activeTab: "pdf" }).activeTab;
    return VALID_TAB_IDS.includes(saved) ? saved : "pdf";
  });

  useEffect(() => {
    saveSessionForm(UPLOAD_TAB_KEY, { activeTab });
  }, [activeTab]);

  return (
    <Card>
      <TabList tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        <TabPanel id="pdf" activeTab={activeTab}>
          <PdfUploadForm webhookUrl={webhookUrl} onSuccess={onSuccess} />
        </TabPanel>
        <TabPanel id="quote" activeTab={activeTab}>
          <QuoteForm webhookUrl={webhookUrl} onSuccess={onSuccess} />
        </TabPanel>
        <TabPanel id="insight" activeTab={activeTab}>
          <InsightForm webhookUrl={webhookUrl} onSuccess={onSuccess} />
        </TabPanel>
        <TabPanel id="note" activeTab={activeTab}>
          <NoteForm webhookUrl={webhookUrl} onSuccess={onSuccess} />
        </TabPanel>
      </div>
    </Card>
  );
}
