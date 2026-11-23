import { getGenres } from "@/lib/data/movies-api";
import { GenreCard } from "@/components/genre-card";
import { LayoutGrid } from "lucide-react";

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <LayoutGrid className="size-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Curated Categories
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading">
          Explore by Genre
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Dive into tailored movie collections categorized by tone, style, and narrative themes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}
