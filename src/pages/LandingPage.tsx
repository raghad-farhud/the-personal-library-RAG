import { Link } from "react-router-dom";
import pixelU from "/images/pixel-u.png";
import pixelL from "/images/pixel-l.png";
import books from "/images/books.png";
import papers from "/images/papers.png";
import bgSphere from "/images/bg-sphere-clean.png";

export function LandingPage() {
  return (
    <>
      <section className="flex min-h-[85vh] lg:min-h-[80vh] h-[calc(90vh-4rem)] lg:max-h-screen flex-col w-full items-center justify-center text-center overflow-hidden">
        <div className="absolute z-10 bottom-0 left-0">
          <img src={pixelU} alt="My Second Brain" className="w-48 h-w-48 drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)] lg:w-md lg:h-auto" />
        </div>
        <div className="absolute z-10 bottom-14 right-4 animate-float sm:right-12 lg:bottom-0 lg:right-28">
          <img src={pixelL} alt="My Second Brain" className="w-28 h-28 drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)] sm:w-48 sm:h-48 lg:w-80 lg:h-80" />
        </div>
        <div className="absolute z-10 bottom-4/6 translate-y-12 right-2 animate-float sm:right-8 lg:bottom-2/3 lg:right-24" style={{ animationDelay: "1.2s" }}>
          <img src={books} alt="My Second Brain" className="w-36 h-auto drop-shadow-[0_8px_12px_oklch(0.65_0.25_340/0.5)] sm:w-36 lg:w-72" />
        </div>
        <div className="absolute z-10 top-1/8 left-2 animate-float sm:top-1/6 sm:left-1/6" style={{ animationDelay: "0.6s" }}>
          <img src={papers} alt="My Second Brain" className="w-32 h-auto sm:w-36 lg:w-72" />
        </div>

        <div className="relative flex flex-col items-center justify-center max-w-3xl">

          <div className="absolute top-0 -translate-y-1/4 right-1/2 translate-x-1/2  opacity-80 w-[110vw] lg:w-full">
            <img src={bgSphere} alt="My Second Brain" className="w-full h-full object-contain " />
          </div>

          <h1 className="text-black relative z-10 text-shadow-[0_0px_8px_oklch(0.65_0.25_340/0.5)] text-5xl font-bold sm:text-6xl lg:text-7xl">
            My Second Brain
          </h1>

          <p className="mt-4 relative z-10 text-lg text-muted-foreground">
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

      <footer className="pb-2 hidden lg:block relative z-10 text-center">
        <p className="text-sm text-muted-foreground">
          A personal RAG knowledge system
        </p>
      </footer>
    </>
  );
}
