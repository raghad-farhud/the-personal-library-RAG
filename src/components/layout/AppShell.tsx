import type { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-24 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"
      />

      <main className="relative mx-auto max-w-5xl px-6 py-8 pt-24">
        {children}
      </main>
    </div>
  );
}
