import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (login(username, password)) {
      navigate("/");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Library Mind
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your library
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-lg"
        >
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg">
            <LogIn className="h-4 w-4" />
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
