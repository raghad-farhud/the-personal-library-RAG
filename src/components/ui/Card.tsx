import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-warm-200/50 bg-white p-6 shadow-sm",
        hover &&
          "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
