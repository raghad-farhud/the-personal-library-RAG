import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
          Library Mind
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Your personal knowledge, beautifully organized.
        </p>

        <blockquote className="mx-auto mt-10 max-w-xl border-l-4 border-primary/50 pl-6 text-left">
          <p className="text-muted-foreground italic">
            "A reader lives a thousand lives before he dies. The man who never
            reads lives only one."
          </p>
          <footer className="mt-2 text-sm text-muted-foreground">
            — George R.R. Martin
          </footer>
        </blockquote>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/upload"
            className="rounded-xl gradient-pink-purple px-8 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl"
          >
            Add Knowledge
          </Link>
          <Link
            to="/ask"
            className="rounded-xl border-2 border-border px-8 py-3 font-medium text-card-foreground transition-all hover:border-primary"
          >
            Ask Your Library
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-secondary" />
          <span className="h-2 w-2 rounded-full bg-secondary" />
        </div>
      </section>

      <footer className="pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Library Mind — A personal RAG knowledge system
        </p>
      </footer>
    </>
  );
}
