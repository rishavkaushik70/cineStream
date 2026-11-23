import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, MapPin, Film, Tv } from "lucide-react";
import { getPersonDetails } from "@/lib/tmdb";
import { MediaImage } from "@/components/media-image";
import { MoviePosterCard } from "@/components/movie-poster-card";

interface PersonDetailPageProps {
  params: Promise<{ id: string }>;
}

async function PersonDetailContent({ params }: PersonDetailPageProps) {
  const { id } = await params;
  const person = await getPersonDetails(id);

  if (!person) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Back button */}
      <div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/80 text-foreground hover:bg-secondary border border-border/50 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Search</span>
        </Link>
      </div>

      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {/* Profile Avatar */}
        <div className="relative w-36 sm:w-48 aspect-[2/3] rounded-2xl overflow-hidden bg-card border border-border shadow-xl shrink-0">
          <MediaImage
            src={person.profileUrl}
            alt={person.name}
            fill
            priority
            sizes="(max-width: 640px) 144px, 192px"
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-bold tracking-wider uppercase border border-primary/25">
            <User className="size-3" />
            <span>{person.knownForDepartment}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-heading">
            {person.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-1">
            {person.birthday && (
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" />
                <span>Born {person.birthday}</span>
              </div>
            )}

            {person.placeOfBirth && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                <span>{person.placeOfBirth}</span>
              </div>
            )}
          </div>

          {/* Biography */}
          <div className="mt-3">
            <h2 className="text-sm font-bold text-foreground mb-1.5">Biography</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
              {person.biography}
            </p>
          </div>
        </div>
      </div>

      {/* Movie Credits Grid */}
      {person.movieCredits.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Film className="size-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              Movie Filmography ({person.movieCredits.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {person.movieCredits.map((movie) => (
              <div key={movie.id} className="flex justify-center">
                <MoviePosterCard item={movie} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TV Credits Grid */}
      {person.tvCredits.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Tv className="size-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
              Television Credits ({person.tvCredits.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {person.tvCredits.map((show) => (
              <div key={show.id} className="flex justify-center">
                <MoviePosterCard item={show} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading Artist Profile...
        </div>
      }
    >
      <PersonDetailContent params={params} />
    </React.Suspense>
  );
}
