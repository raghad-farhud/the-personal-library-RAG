import { NavLink, Link } from "react-router-dom";
import { BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/ask", label: "Ask" },
] as const;

export function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 h-16 border-b border-warm-200/50 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-rose-400" />
          <span className="font-serif text-lg text-warm-900">Library Mind</span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors",
                  isActive
                    ? "font-medium text-rose-500"
                    : "text-warm-500 hover:text-warm-700",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <Link to="/settings" className="text-warm-400 transition-colors hover:text-warm-600">
          <Settings className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
}
