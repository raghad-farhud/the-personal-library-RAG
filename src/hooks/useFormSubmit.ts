import { useState, useCallback, useRef, useEffect } from "react";
import type { SubmitStatus } from "@/types";

const SUCCESS_RESET_MS = 4000;

export function useFormSubmit<T>() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setStatus("idle");
    setMessage("");
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const submit = useCallback(
    async (fn: () => Promise<{ success: boolean; message: string }>) => {
      setStatus("loading");
      setMessage("");

      try {
        const result = await fn();
        setStatus(result.success ? "success" : "error");
        setMessage(result.message);

        if (result.success) {
          resetTimeoutRef.current = setTimeout(() => {
            reset();
          }, SUCCESS_RESET_MS);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setStatus("error");
        setMessage(errorMessage);
      }
    },
    []
  );

  return { status, message, submit, reset };
}
