import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AppShell() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {isAuthenticated && <Navigation />}

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-24 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"
      />

      <main className={`relative px-2 md:px-6 py-8 ${isAuthenticated ? "pt-24" : "pt-8"}`}>
        <Outlet />
      </main>
    </div>
  );
}
