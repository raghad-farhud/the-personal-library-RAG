import { cn } from "@/lib/cn";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Toggle({ label, checked, onChange, className }: ToggleProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2",
          checked ? "bg-sage-400" : "bg-warm-200",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
      <span className="text-sm font-sans text-warm-600">{label}</span>
    </label>
  );
}
