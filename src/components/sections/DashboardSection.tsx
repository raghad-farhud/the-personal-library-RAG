import { Upload, FileText, Search, Link } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DashboardStats } from "@/types";
import type { ReactNode } from "react";

interface DashboardSectionProps {
  stats: DashboardStats;
}

function truncate(text: string, max: number) {
  if (!text) return "—";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

function StatCard({ icon, label, children }: StatCardProps) {
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

function ConfigDot({ configured }: { configured: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          configured ? "bg-secondary" : "bg-muted-foreground/30",
        )}
      />
      <span className="text-sm text-card-foreground">
        {configured ? "Connected" : "Not set"}
      </span>
    </span>
  );
}

export function DashboardSection({ stats }: DashboardSectionProps) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard icon={<Upload className="h-4 w-4 text-primary" />} label="Uploads Today">
        {stats.uploadsToday}
      </StatCard>
      <StatCard icon={<FileText className="h-4 w-4 text-secondary" />} label="Last Source">
        {stats.lastSourceType || "—"}
      </StatCard>
      <StatCard icon={<Search className="h-4 w-4 text-secondary" />} label="Last Query">
        {truncate(stats.lastQuery, 30)}
      </StatCard>
      <StatCard icon={<Link className="h-4 w-4 text-primary" />} label="Ingestion">
        <ConfigDot configured={stats.ingestionConfigured} />
      </StatCard>
      <StatCard icon={<Link className="h-4 w-4 text-secondary" />} label="Ask Endpoint">
        <ConfigDot configured={stats.askConfigured} />
      </StatCard>
    </section>
  );
}
