"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AppSidebar } from "./app-sidebar";
import { TopNavigation } from "./top-navigation";
import { SidebarProvider, useSidebar } from "./sidebar-context";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary/30 selection:text-foreground">
      {/* Sidebar (Desktop Persistent Collapsible + Mobile Drawer) */}
      <React.Suspense
        fallback={
          <aside className="hidden lg:flex w-56 fixed inset-y-0 left-0 bg-sidebar border-r border-sidebar-border z-30" />
        }
      >
        <AppSidebar />
      </React.Suspense>

      {/* Main Content Area (Expands dynamically when sidebar is collapsed) */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-18" : "lg:pl-56"
        }`}
      >
        {/* Top Navigation Bar */}
        <React.Suspense
          fallback={
            <header className="sticky top-0 z-20 h-16 w-full bg-background/85 border-b border-border/40" />
          }
        >
          <TopNavigation />
        </React.Suspense>

        {/* Page Canvas */}
        <main className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 md:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>

        {/* Global Cinematic Footer with TMDB Attribution */}
        <footer className="mt-auto border-t border-border/40 py-8 px-6 text-xs text-muted-foreground/80 bg-background/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1700px] mx-auto">
            {/* Left: Branding & Disclaimer */}
            <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left max-w-xl">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <span className="font-heading tracking-tight">CineStream</span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-[11px] text-primary">Cinematic Discovery Platform</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
                Ratings, backdrops, and media information are provided by The Movie Database.
              </p>
            </div>

            {/* Right: TMDB Official Badge & Navigation Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 opacity-85 hover:opacity-100 transition-opacity"
                title="The Movie Database (TMDB)"
              >
                <Image
                  src="/tmdb-logo.svg"
                  alt="The Movie Database (TMDB) Logo"
                  width={140}
                  height={14}
                  className="h-3.5 w-auto"
                />
              </a>

              <div className="flex items-center gap-4 text-xs font-medium">
                <Link href="/movies" className="hover:text-foreground transition-colors">
                  Movies
                </Link>
                <Link href="/tv" className="hover:text-foreground transition-colors">
                  TV Shows
                </Link>
                <Link href="/genres" className="hover:text-foreground transition-colors">
                  Genres
                </Link>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  Attribution & Settings
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppShellInner>{children}</AppShellInner>
    </SidebarProvider>
  );
}
