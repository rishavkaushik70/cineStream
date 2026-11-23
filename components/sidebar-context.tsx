"use client";

import * as React from "react";

interface SidebarContextType {
  isMobileOpen: boolean;
  isCollapsed: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleCollapse: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

const STORAGE_KEY = "cinestream-sidebar-collapsed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cinestream_sidebar_toggle", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cinestream_sidebar_toggle", callback);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Sync collapsed state with localStorage using React 19 recommended useSyncExternalStore
  const isCollapsed = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggleMobile = React.useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const setIsCollapsed = React.useCallback((collapsed: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed));
      window.dispatchEvent(new Event("cinestream_sidebar_toggle"));
    } catch {}
  }, []);

  const toggleCollapse = React.useCallback(() => {
    try {
      const next = !getSnapshot();
      localStorage.setItem(STORAGE_KEY, String(next));
      window.dispatchEvent(new Event("cinestream_sidebar_toggle"));
    } catch {}
  }, []);

  const value = React.useMemo(
    () => ({
      isMobileOpen,
      isCollapsed,
      setIsMobileOpen,
      toggleMobile,
      setIsCollapsed,
      toggleCollapse,
    }),
    [isMobileOpen, isCollapsed, toggleMobile, setIsCollapsed, toggleCollapse]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
