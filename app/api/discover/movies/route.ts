import { NextRequest, NextResponse } from "next/server";
import { discoverMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const genre = searchParams.get("genre") || undefined;
    const year = searchParams.get("year") || undefined;
    const ratingStr = searchParams.get("minRating");
    const minRating = ratingStr ? parseFloat(ratingStr) : undefined;
    const sortBy = searchParams.get("sortBy") || "popularity.desc";
    const country = searchParams.get("country") || undefined;

    const data = await discoverMovies({
      page,
      with_genres: genre === "all" ? undefined : genre,
      primary_release_year: year === "all" ? undefined : year,
      "vote_average.gte": minRating && minRating > 0 ? minRating : undefined,
      sort_by: sortBy,
      with_origin_country: country === "all" ? undefined : country,
    });

    return NextResponse.json(data);
  } catch (error) {
    if ((error as { digest?: string })?.digest?.startsWith("NEXT_PRERENDER")) {
      throw error;
    }
    console.error("[API Discover Movies Error]", error);
    return NextResponse.json(
      { error: "Failed to discover movies" },
      { status: 500 }
    );
  }
}
