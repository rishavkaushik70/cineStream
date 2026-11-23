<div align="center">

  <h1>🎬 CineStream</h1>
  <p><strong>A modern, high-performance cinematic movie & TV discovery web application.</strong></p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.4.6-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.themoviedb.org"><img src="https://img.shields.io/badge/TMDB_API-v3%2Fv4-01B4E4?style=for-the-badge&logo=the-movie-database" alt="TMDB API" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#environment-variables">Environment Variables</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#tmdb-attribution">Attribution</a>
  </p>
</div>

---

## 📖 Overview

**CineStream** delivers a rich, responsive cinematic streaming and discovery interface built on the Next.js App Router and powered by The Movie Database (TMDB) API. It features real-time search, deep filtering, interactive trailers, and an offline-safe personal library for watchlists, favorites, and view history.

Designed with a warm amber/orange cinematic theme, CineStream pairs high-resolution TMDB artwork with optimized typography, fluid micro-interactions, and resilient networking.

---

## ✨ Features

### 🎞️ Dynamic Featured Hero Carousel
- Powered directly by TMDB weekly trending movies (`/3/trending/movie/week`).
- Dual-artwork composition: high-resolution multi-gradient backdrop overlaid with the title's vertical poster.
- Auto-rotates every 7 seconds; automatically pauses on cursor hover or keyboard focus.
- Interactive slide indicators, progress tracking (`2 / 5`), and instant trailer modal preview.

### 🧭 Unified Navigation & Responsive Layout
- **Single Master Toggle:** Header-based toggle handling both desktop sidebar expansion/collapse (icon-only mode) and mobile drawer overlay.
- Zero layout shift and zero horizontal overflow across all screen dimensions.
- Persistent active-route indicators with smooth CSS transitions.

### 🔍 Deep Exploration & Multi-Factor Filtering
- **Movies & TV Discovery:** Live filter matrix supporting genre selection, release year, minimum vote average, and sorting (popularity, release date, rating).
- **Search System:** Real-time debounced multi-search across movies, TV series, and actors with direct result routing.
- **Browse by Categories:** Dedicated exploration hubs for **Genres** (`/genres`) and **Countries** (`/countries`).

### 🎬 Comprehensive Dynamic Media Pages
- **Movie Details (`/movie/[id]`):** Synopsis, runtime, genres, vote counts, cast/crew avatars, official YouTube trailers, and similar recommendations.
- **TV Series Details (`/tv/[id]`):** Number of seasons/episodes, network information, episodic ratings, cast breakdown, and related series.
- **Person Profiles (`/person/[id]`):** Actor/director biography, department, known-for filmography, and biographical details.

### 📌 Client-Side Personal Library
- **Favorites & Watchlist:** Add or remove any movie or series with instant feedback across all cards and detail pages.
- **Watch History:** Automatic client-side history tracking on media view.
- **Hydration Safe:** Built with `useSyncExternalStore` and `localStorage` to completely prevent SSR hydration mismatch warnings.

### ⚡ Resilient Server Architecture
- **Bearer Token Security:** Keeps `TMDB_ACCESS_TOKEN` strictly server-side inside Route Handlers and Server Components.
- **DNS Resilience:** Integrated DNS-over-HTTPS resolver fallback (Cloudflare `1.1.1.1` and Google `8.8.8.8`) to bypass regional or ISP-level DNS blocks on TMDB endpoints.
- **Fallback Imagery:** Custom inline SVGs for posters, backdrops, and avatars to guarantee zero broken image icons.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Theme** | Dark / Light / System mode via [`next-themes`](https://github.com/pacocoursey/next-themes) |
| **Data Source** | [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) (v3 & v4) |
| **State Management** | React 19 hooks + `useSyncExternalStore` for synchronized `localStorage` |
| **Deployment** | Optimized for [Vercel](https://vercel.com/) |

---

## 📂 Project Architecture

```
cine-stream/
├── app/
│   ├── api/                     # Server-side Route Handlers (TMDB proxy)
│   │   ├── countries/           # Region lists
│   │   ├── discover/            # Filtered movie & tv discovery endpoints
│   │   ├── genres/              # Genre definitions
│   │   └── search/              # Multi-search handler
│   ├── countries/               # Regional browse page
│   ├── favorites/               # User saved favorites
│   ├── genres/                  # Genre directory page
│   ├── history/                 # User watch history
│   ├── movie/[id]/              # Dynamic movie detail view
│   ├── movies/                  # Movie discovery page with filters
│   ├── person/[id]/             # Actor & director profile view
│   ├── search/                  # Search results page
│   ├── settings/                # User preferences & data reset
│   ├── tv/[id]/                 # Dynamic TV show detail view
│   ├── tv/                      # TV discovery page with filters
│   ├── watchlist/               # User watchlist
│   ├── error.tsx                # Global error boundary
│   ├── layout.tsx               # Root layout & providers
│   ├── loading.tsx              # Skeleton loading state
│   ├── not-found.tsx            # Custom 404 page
│   └── page.tsx                 # Homepage with dynamic hero & carousels
├── components/
│   ├── app-shell.tsx            # Responsive application shell
│   ├── app-sidebar.tsx          # Collapsible desktop/mobile sidebar
│   ├── featured-hero.tsx        # Dynamic TMDB trending hero carousel
│   ├── media-action-buttons.tsx # Favorite & Watchlist bookmark controls
│   ├── media-image.tsx          # Resilient image with fallback SVG
│   ├── movie-carousel.tsx       # Horizontal scrolling media rail
│   ├── movie-poster-card.tsx    # Media card with ratings & quick actions
│   ├── search-filters.tsx       # Discovery filter toolbar
│   ├── sidebar-context.tsx      # Sidebar state provider
│   ├── theme-toggle.tsx         # Dark / Light theme switch
│   ├── top-navigation.tsx       # Header with search & single collapse control
│   └── trailer-modal.tsx        # YouTube video player dialog
├── lib/
│   ├── hooks/
│   │   └── use-user-lists.ts    # Hydration-safe localStorage store
│   └── tmdb/                    # Centralized TMDB integration layer
│       ├── api.ts               # Core high-level fetch methods
│       ├── client.ts            # Resilient HTTP client with DNS fallback
│       ├── endpoints.ts         # TMDB API endpoint URLs
│       ├── images.ts            # Image URL generator & placeholder fallbacks
│       ├── transforms.ts        # Raw payload normalizers
│       └── types.ts             # TypeScript definitions
└── public/                      # Static assets & SVG fallback artwork
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.18.0` or higher (Node `v20+` recommended)
- **npm**, **pnpm**, or **yarn**
- A **TMDB API Read Access Token** (free to register at [themoviedb.org](https://www.themoviedb.org/settings/api))

### 1. Clone the Repository

```bash
git clone https://github.com/rishavkaushik70/cineStream.git
cd cineStream/cine-stream
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of `cine-stream` by copying `.env.example`:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your TMDB credentials:

```env
# TMDB API Read Access Token (Server-side Bearer token - Recommended)
TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here

# Optional: TMDB v3 API Key (fallback if required)
TMDB_API_KEY=your_tmdb_api_key_here
```

> [!IMPORTANT]
> Keep `TMDB_ACCESS_TOKEN` confidential. Never prefix it with `NEXT_PUBLIC_` or commit `.env.local` to version control.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience CineStream.

---

## ⚙️ Environment Variables

| Variable | Description | Required | Scope |
|---|---|:---:|:---:|
| `TMDB_ACCESS_TOKEN` | TMDB v4 API Read Access Token (Bearer token authentication) | **Yes** | Server-only |
| `TMDB_API_KEY` | TMDB v3 API Key (used as fallback query parameter) | No | Server-only |

---

## 🧪 Production Verification

To verify that the application compiles cleanly without errors:

```bash
# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Production build
npm run build

# Start production server
npm start
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. If the repository contains a subfolder (`cine-stream`), set the **Root Directory** to `cine-stream`.
4. In the **Environment Variables** section, add:
   - `TMDB_ACCESS_TOKEN`: Your TMDB API Read Access Token.
5. Click **Deploy**. Next.js will automatically build and optimize the routes.

---

## 📜 TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

<p align="left">
  <img src="public/tmdb-logo.svg" alt="TMDB Logo" width="130" />
</p>

*All movie and television metadata, imagery, and cast information are provided courtesy of [The Movie Database (TMDB)](https://www.themoviedb.org/).*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
