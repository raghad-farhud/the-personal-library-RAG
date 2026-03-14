import { NavLink, Link } from "react-router-dom";
import logo from "/images/pixel-l.png";
import { cn } from "@/lib/cn";
import { Home, Upload, Message } from 'pixelarticons/react'


const NAV_LINKS = [
  { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { to: "/upload", label: "Upload", icon: <Upload className="w-5 h-5" /> },
  { to: "/ask", label: "Ask", icon: <Message className="w-5 h-5" /> },
] as const;

export function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 h-16 border-b border-border/50 bg-card/90 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Library Mind" className="relative w-24 translate-y-5 drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)] h-24" />
          <span className="text-lg text-foreground">My Second Brain</span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors flex gap-1 items-center",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
