import { cn } from "@/lib/cn";

interface StatusMessageProps {
  type: "success" | "error" | "idle";
  message: string;
}

const typeStyles: Record<"success" | "error", string> = {
  success: "border-sage-200 bg-sage-100 text-sage-500",
  error: "border-rose-200 bg-rose-100 text-rose-500",
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  if (type === "idle") return null;

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-sans",
        "animate-[status-enter_0.3s_ease-out]",
        typeStyles[type],
      )}
    >
      {message}
    </div>
  );
}
