import { cn } from "@/lib/cn";

interface StatusMessageProps {
  type: "success" | "error" | "idle";
  message: string;
}

const typeStyles: Record<"success" | "error", string> = {
  success: "border-secondary/20 bg-secondary/10 text-secondary",
  error: "border-primary/20 bg-primary/10 text-primary",
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (type === "idle") return null;

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        "animate-[status-enter_0.3s_ease-out]",
        typeStyles[type],
      )}
    >
      {message}
    </div>
  );
}
