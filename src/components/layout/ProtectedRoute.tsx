import type { ReactNode } from "react";
import { ShieldX } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <ShieldX className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Access Denied
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
