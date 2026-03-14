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
    <nav className="fixed inset-x-0 top-0 z-10 h-16 border-b border-border/50 bg-card/90 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-lg text-foreground">Library Mind</span>
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
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
