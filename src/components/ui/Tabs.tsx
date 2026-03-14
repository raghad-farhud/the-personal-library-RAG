import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function TabList({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabListProps) {
  return (
    <div
      className={cn(
        "flex gap-6 border-b border-warm-200 pb-px",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 pb-2 font-serif text-sm transition-colors -mb-px",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 rounded-sm",
              isActive
                ? "text-rose-500 border-b-2 border-rose-500"
                : "text-warm-400 hover:text-warm-600",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({
  id,
  activeTab,
  children,
  className,
}: TabPanelProps) {
  if (id !== activeTab) return null;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}
