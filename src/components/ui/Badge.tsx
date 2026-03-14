import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-cream-200 text-warm-700",
  success: "bg-sage-100 text-sage-500",
  warning: "bg-amber-100 text-amber-500",
  info: "bg-rose-100 text-rose-500",
};

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-sans font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
