import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      const msg = this.state.error.message;
      const isConfig =
        msg.includes("VITE_SUPABASE") ||
        msg.includes("Missing") ||
        msg.includes("env");

      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-foreground"
          role="alert"
        >
          <h1 className="text-xl font-semibold">
            {isConfig ? "Configuration needed" : "Something went wrong"}
          </h1>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            {msg}
          </p>
          {isConfig && (
            <p className="max-w-md text-center text-xs text-muted-foreground">
              Add the required environment variables (e.g. in GitHub repo →
              Settings → Secrets and variables → Actions) and redeploy. See{" "}
              <code className="rounded bg-muted px-1">DEPLOY.md</code> for
              details.
            </p>
          )}
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="rounded-lg border border-border bg-muted px-4 py-2 text-sm hover:bg-muted/80"
          >
            Dismiss
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
