import { NextResponse } from "next/server";
import { getMovieGenres, getTvGenres } from "@/lib/tmdb";

export async function GET() {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      getMovieGenres(),
      getTvGenres(),
    ]);

    return NextResponse.json({
      movieGenres,
      tvGenres,
    });
  } catch (error) {
    console.error("[API Genres Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}

