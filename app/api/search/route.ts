import { NextRequest, NextResponse } from "next/server";
import { searchMulti } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const pageStr = searchParams.get("page") || "1";
    const page = Math.max(1, parseInt(pageStr, 10) || 1);

    if (!query.trim()) {
      return NextResponse.json({
        page: 1,
        totalPages: 0,
        totalResults: 0,
        results: [],
      });
    }

    // Input sanitization: limit length
    const sanitized = query.slice(0, 100);

    const data = await searchMulti(sanitized, page);
    return NextResponse.json(data);
  } catch (error) {
    if ((error as { digest?: string })?.digest?.startsWith("NEXT_PRERENDER")) {
      throw error;
    }
    console.error("[API Search Error]", error);
    return NextResponse.json(
      { error: "Failed to perform search query" },
      { status: 500 }
    );
  }
}
