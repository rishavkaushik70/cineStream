import { NextResponse } from "next/server";
import { getTmdbCountries } from "@/lib/tmdb";

export async function GET() {
  try {
    const countries = await getTmdbCountries();
    return NextResponse.json({ countries });
  } catch (error) {
    console.error("[API Countries Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}

