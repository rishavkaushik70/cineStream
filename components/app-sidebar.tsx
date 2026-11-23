"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Film,
  Tv,
  LayoutGrid,
  Globe,
  Search,
  Heart,
  Bookmark,
  History,
  Settings,
  Play,
  X,
  HardDrive,
} from "lucide-react";
import { useSidebar } from "./sidebar-context";

const MAIN_NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies", href: "/movies", icon: Film },
  { name: "TV Shows", href: "/tv", icon: Tv },
  { name: "Genres", href: "/genres", icon: LayoutGrid },
  { name: "Countries", href: "/countries", icon: Globe },
  { name: "Search", href: "/search", icon: Search },
];

const LIBRARY_NAV_ITEMS = [
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Watchlist", href: "/watchlist", icon: Bookmark },
  { name: "History", href: "/history", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, setIsMobileOpen, isCollapsed } = useSidebar();

  // Close mobile drawer when route changes
  const prevPathname = React.useRef(pathname);
  React.useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsMobileOpen(false);
    }
  }, [pathname, setIsMobileOpen]);

  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const renderNavItems = (items: typeof MAIN_NAV_ITEMS) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={handleNavClick}
          title={isCollapsed ? item.name : undefined}
          className={`flex items-center ${
            isCollapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3.5 py-2.5"
          } rounded-xl text-sm font-medium transition-all ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold"
              : "text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
        >
          <Icon
            className={`size-4.5 shrink-0 ${
              isActive ? "text-primary-foreground" : "text-sidebar-foreground/60"
            }`}
          />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </Link>
      );
    });
  };

  return (
    <>
      {/* 1. Desktop Sidebar (Persistent & Collapsible) */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 bg-sidebar border-r border-sidebar-border z-30 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-18" : "w-56"
        }`}
        aria-label="Desktop Sidebar"
      >
        <div className="flex h-full flex-col justify-between p-3 select-none">
          {/* Top Brand & Links */}
          <div className="flex flex-col gap-5">
            {/* Brand Header — Collapse button removed here, header button is now the ONLY collapse control */}
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start px-2"
              } pt-2`}
            >
              <Link
                href="/"
                className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1"
                title="CineStream"
              >
                <div className="size-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform shrink-0">
                  <Play className="size-4 fill-black translate-x-0.5" />
                </div>
                {!isCollapsed && (
                  <span className="text-xl font-bold tracking-tight text-foreground font-heading">
                    Cine<span className="text-primary font-black">Stream</span>
                  </span>
                )}
              </Link>
            </div>

            {/* Primary Navigation */}
            <nav className="flex flex-col gap-1" aria-label="Main Navigation">
              {renderNavItems(MAIN_NAV_ITEMS)}
            </nav>

            {/* Library Navigation */}
            <div className="flex flex-col gap-1 pt-2 border-t border-sidebar-border/40">
              {!isCollapsed && (
                <span className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
                  My Space
                </span>
              )}
              {renderNavItems(LIBRARY_NAV_ITEMS)}
            </div>
          </div>

          {/* Bottom Actions (Clean and Honest Local Experience) */}
          <div className="flex flex-col gap-1.5 pt-3 border-t border-sidebar-border/50">
            {/* Honest Local Storage Indicator */}
            <div
              className={`rounded-xl bg-secondary/50 border border-border/40 text-muted-foreground flex items-center ${
                isCollapsed
                  ? "justify-center p-2.5"
                  : "gap-2.5 px-3 py-2 text-xs"
              }`}
              title="CineStream Local Mode: Favorites, Watchlist & History stored on this browser"
            >
              <HardDrive className="size-4 text-primary shrink-0" />
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold text-foreground truncate">
                    Local Space
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 truncate">
                    Saved on this device
                  </span>
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              href="/settings"
              onClick={handleNavClick}
              title={isCollapsed ? "Settings" : undefined}
              className={`flex items-center ${
                isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"
              } rounded-xl text-sm font-medium transition-colors ${
                pathname === "/settings"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            >
              <Settings className="size-4.5 text-sidebar-foreground/60 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 3. Mobile Slide-Over Drawer Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border lg:hidden transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between p-4 overflow-y-auto ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex flex-col gap-6">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-1">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="size-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black shadow-md shadow-amber-900/20">
                <Play className="size-4 fill-black translate-x-0.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground font-heading">
                Cine<span className="text-primary font-black">Stream</span>
              </span>
            </Link>

            <button
              onClick={() => setIsMobileOpen(false)}
              type="button"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Mobile Main Nav */}
          <nav className="flex flex-col gap-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                  }`}
                >
                  <Icon className="size-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Library Nav */}
          <div className="flex flex-col gap-1 pt-2 border-t border-sidebar-border/40">
            <span className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
              My Space
            </span>
            {LIBRARY_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                  }`}
                >
                  <Icon className="size-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Bottom Actions */}
        <div className="flex flex-col gap-2 pt-4 border-t border-sidebar-border/50">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-secondary/50 text-xs text-muted-foreground border border-border/40">
            <HardDrive className="size-4 text-primary shrink-0" />
            <span className="truncate">Saved locally on this device</span>
          </div>

          <Link
            href="/settings"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
          >
            <Settings className="size-4.5 text-sidebar-foreground/60" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
