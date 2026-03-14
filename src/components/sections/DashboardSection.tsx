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
    <div className="flex items-center gap-3 rounded-xl border border-warm-200/50 bg-white px-4 py-3">
      {icon}
      <div className="min-w-0">
        <p className="text-[11px] font-sans uppercase tracking-wide text-warm-400">
          {label}
        </p>
        <p className="truncate text-sm font-sans text-warm-700">{children}</p>
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
          configured ? "bg-sage-400" : "bg-warm-300",
        )}
      />
      <span className="text-sm text-warm-700">
        {configured ? "Connected" : "Not set"}
      </span>
    </span>
  );
}

export function DashboardSection({ stats }: DashboardSectionProps) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard icon={<Upload className="h-4 w-4 text-rose-400" />} label="Uploads Today">
        {stats.uploadsToday}
      </StatCard>
      <StatCard icon={<FileText className="h-4 w-4 text-amber-400" />} label="Last Source">
        {stats.lastSourceType || "—"}
      </StatCard>
      <StatCard icon={<Search className="h-4 w-4 text-sage-400" />} label="Last Query">
        {truncate(stats.lastQuery, 30)}
      </StatCard>
      <StatCard icon={<Link className="h-4 w-4 text-rose-400" />} label="Ingestion">
        <ConfigDot configured={stats.ingestionConfigured} />
      </StatCard>
      <StatCard icon={<Link className="h-4 w-4 text-amber-400" />} label="Ask Endpoint">
        <ConfigDot configured={stats.askConfigured} />
      </StatCard>
    </section>
  );
}
