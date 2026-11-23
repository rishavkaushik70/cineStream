import Link from "next/link";
import { Film, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="size-20 rounded-3xl bg-secondary/80 border border-border flex items-center justify-center text-primary mb-6 shadow-xl">
        <Film className="size-10 text-primary/70" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
        404 Error
      </span>

      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground font-heading mb-3">
        Media Title Not Found
      </h1>

      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        The cinematic masterwork, television series, or artist you requested could not be located
        in the catalog or may have been unlisted.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all shadow-md"
        >
          <Home className="size-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 border border-border transition-all"
        >
          <Search className="size-4" />
          <span>Search Catalog</span>
        </Link>
      </div>
    </div>
  );
}

