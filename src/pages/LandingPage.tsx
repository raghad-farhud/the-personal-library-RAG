import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h1 className="bg-linear-to-r from-rose-400 via-amber-400 to-sage-400 bg-clip-text font-serif text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
          Library Mind
        </h1>

        <p className="mt-4 text-lg text-warm-500">
          Your personal knowledge, beautifully organized.
        </p>

        <blockquote className="mx-auto mt-10 max-w-xl border-l-4 border-rose-300 pl-6 text-left">
          <p className="font-serif text-warm-600 italic">
            "A reader lives a thousand lives before he dies. The man who never
            reads lives only one."
          </p>
          <footer className="mt-2 text-sm text-warm-400">
            — George R.R. Martin
          </footer>
        </blockquote>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/upload"
            className="rounded-xl bg-linear-to-r from-rose-400 to-rose-500 px-8 py-3 font-medium text-white shadow-lg shadow-rose-300/25 transition-all hover:shadow-xl"
          >
            Add Knowledge
          </Link>
          <Link
            to="/ask"
            className="rounded-xl border-2 border-warm-200 px-8 py-3 font-medium text-warm-700 transition-all hover:border-rose-300"
          >
            Ask Your Library
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-sage-400" />
        </div>
      </section>

      <footer className="pb-8 text-center">
        <p className="text-sm text-warm-400">
          Library Mind — A personal RAG knowledge system
        </p>
      </footer>
    </>
  );
}
