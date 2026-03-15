import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link } from "react-router-dom";
import logo from "/images/pixel-l.png";
import { cn } from "@/lib/cn";
import { Home, Upload, Message, Library, Menu, Cancel } from "pixelarticons/react";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: <Home className="w-5 h-5 shrink-0" /> },
  { to: "/library", label: "Library", icon: <Library className="w-5 h-5 shrink-0" /> },
  { to: "/upload", label: "Upload", icon: <Upload className="w-5 h-5 shrink-0" /> },
  { to: "/ask", label: "Ask", icon: <Message className="w-5 h-5 shrink-0" /> },
] as const;

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm transition-colors flex gap-2 items-center py-2 px-3 rounded-md",
    isActive
      ? "font-medium text-primary bg-primary/10"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
  );

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <nav className="fixed inset-x-0 top-0 z-10 h-16 border-b border-border/50 bg-card/90 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 min-w-0"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logo}
            alt="Library Mind"
            className="relative h-10 w-auto shrink-0 drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)] sm:h-14"
          />
          <span className="truncate text-base text-foreground sm:text-lg">
            My Second Brain
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
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

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <Cancel className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>

    {/* Mobile menu panel — portaled to body so it sits above all page content */}
    {typeof document !== "undefined" &&
      createPortal(
        <div
          className={cn(
            "fixed inset-x-0 top-16 z-10000 border-b border-border/50 rounded-b-2xl drop-shadow-xl bg-card/95 backdrop-blur-lg transition-[visibility,opacity] duration-200 md:hidden",
            menuOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
        >
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={navLinkStyles}
                  onClick={() => setMenuOpen(false)}
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
