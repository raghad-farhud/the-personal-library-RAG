import { Link } from "react-router-dom";
import pixelU from "/images/pixel-u.png";
import pixelL from "/images/pixel-l.png";
import books from "/images/books.png";
import papers from "/images/papers.png";
import bgSphere from "/images/bg-sphere-clean.png";

export function LandingPage() {
  return (
    <>
      <section className="flex min-h-[80vh] md:max-h-screen flex-col w-full items-center justify-center text-center overflow-hidden">
        <div className="absolute z-10 -bottom-10 left-0 animate-float" style={{ animationDelay: "1.5s" }}>
          <img src={pixelU} alt="My Second Brain" className="w-md h-md drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)]" />
        </div>
        <div className="absolute z-10 bottom-0 right-28 animate-float">
          <img src={pixelL} alt="My Second Brain" className="w-96 h-96 drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)]" />
        </div>
        <div className="absolute z-10 bottom-2/3 right-24 animate-float" style={{ animationDelay: "1.2s" }}>
          <img src={books} alt="My Second Brain" className="w-72 h-auto drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)]" />
        </div>
        <div className="absolute z-10 top-1/6 left-1/6 animate-float" style={{ animationDelay: "0.6s" }}>
          <img src={papers} alt="My Second Brain" className="w-72 h-auto" />
        </div>

        <div className="relative flex flex-col items-center justify-center max-w-3xl">

          <div className="absolute top-0 -translate-y-1/4 right-1/2 translate-x-1/2  opacity-80 w-full">
            <img src={bgSphere} alt="My Second Brain" className="w-full h-full object-contain " />
          </div>

          <h1 className="text-black relative z-10 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)] text-5xl font-bold sm:text-6xl md:text-7xl">
            My Second Brain
          </h1>

          <p className="mt-4 relative text-lg text-muted-foreground">
            A private reading room for your mind — where the books you loved, the words that moved you, and your own reflections meet
          </p>

          <blockquote className="relative mx-auto mt-4 max-w-xl px-8 text-center">
            <span className="absolute left-0 top-0 font-serif text-5xl leading-none text-amber-200 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)] select-none sm:text-6xl" aria-hidden>"</span>
            <span className="absolute right-0 top-0 font-serif text-5xl leading-none text-amber-200 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)]   select-none sm:text-6xl" aria-hidden>"</span>
            <p className="relative text-muted-foreground italic">
              A reader lives a thousand lives before he dies. The man who never
              reads lives only one.
            </p>
            <footer className="mt-1 text-sm text-muted-foreground">
              — George R.R. Martin
            </footer>
          </blockquote>

          <blockquote className="relative mx-auto mt-4 max-w-xl px-8 text-center" dir="rtl">
            <span className="absolute left-0 top-0 font-serif text-5xl leading-none text-amber-200 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)] select-none sm:text-6xl" aria-hidden>"</span>
            <span className="absolute right-0 top-0 font-serif text-5xl leading-none text-amber-200 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)] select-none sm:text-6xl" aria-hidden>"</span>
            <p className="relative text-muted-foreground italic">
              القراءةُ حياةٌ ثانية تُضافُ إلى حياتك
            </p>
            <footer className="mt-1 text-sm text-muted-foreground">
              — علي الطنطاوي
            </footer>
          </blockquote>

          <div className="mt-10 relative z-10 flex flex-wrap items-center justify-center gap-4">
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
