import { Upload, FileText, Search, Link, FileUp, Quote, Lightbulb, StickyNote } from "lucide-react";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Card } from "@/components/ui/Card";

function StatCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card px-4 py-3">
      {icon}
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm text-card-foreground">{children}</p>
      </div>
    </div>
  );
}

const DEMO_TABS = [
  { id: "pdf", label: "Upload PDF", icon: <FileUp className="h-4 w-4" /> },
  { id: "quote", label: "Add Quote", icon: <Quote className="h-4 w-4" /> },
  { id: "insight", label: "Add Insight", icon: <Lightbulb className="h-4 w-4" /> },
  { id: "note", label: "Add Note", icon: <StickyNote className="h-4 w-4" /> },
];

export function DemoUploadPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl text-foreground">Add to Your Library</h1>
        <p className="mt-2 text-muted-foreground">
          Upload documents, save quotes, capture insights, or jot down notes.
        </p>
      </header>

      <DemoBanner />

      {/* Demo dashboard stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          icon={<Upload className="h-4 w-4 text-primary" />}
          label="Uploads Today"
        >
          3
        </StatCard>
        <StatCard
          icon={<FileText className="h-4 w-4 text-secondary" />}
          label="Last Source"
        >
          book_pdf
        </StatCard>
        <StatCard
          icon={<Search className="h-4 w-4 text-secondary" />}
          label="Last Query"
        >
          Key ideas from Atomic…
        </StatCard>
        <StatCard
          icon={<Link className="h-4 w-4 text-primary" />}
          label="Ingestion"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
            <span className="text-sm text-card-foreground">Connected</span>
          </span>
        </StatCard>
        <StatCard
          icon={<Link className="h-4 w-4 text-secondary" />}
          label="Ask Endpoint"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
            <span className="text-sm text-card-foreground">Connected</span>
          </span>
        </StatCard>
      </section>

      {/* Demo upload form (read-only preview) */}
      <Card>
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {DEMO_TABS.map((tab, i) => (
            <button
              key={tab.id}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              } cursor-not-allowed`}
              disabled
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4 opacity-60 pointer-events-none select-none">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Title
            </label>
            <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              e.g. Deep Work
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Author
            </label>
            <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              e.g. Cal Newport
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Language
              </label>
              <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
                English
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Category
              </label>
              <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
                e.g. Productivity
              </div>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
            <FileUp className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag & drop a PDF here, or click to browse
            </p>
          </div>
          <button
            disabled
            className="w-full rounded-xl gradient-pink-purple px-6 py-3 font-medium text-white shadow-lg opacity-70"
          >
            Upload Document
          </button>
        </div>
      </Card>
    </div>
  );
}
