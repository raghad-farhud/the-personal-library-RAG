import { Link } from "react-router-dom";
import { Eye, LogIn } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-primary">
          <Eye className="h-4 w-4 shrink-0" />
          <span>
            <strong>Demo mode</strong> — You're viewing sample data. Actual
            content is private to the owner.
          </span>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <LogIn className="h-3.5 w-3.5" />
          Sign in
        </Link>
      </div>
    </div>
  );
}
