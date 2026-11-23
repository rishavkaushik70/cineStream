"use client";

import * as React from "react";
import { MediaItem } from "../types/movie";

export interface StoredMediaItem {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  mediaType: "movie" | "tv";
  releaseYear: number;
  releaseDate: string;
  rating: number;
  genres: string[];
  runtime?: string;
  savedAt?: string;
}

export interface HistoryItem extends StoredMediaItem {
  viewedAt: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  favorites: "cinestream_v2_favorites",
  watchlist: "cinestream_v2_watchlist",
  history: "cinestream_v2_history",
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cinestream_lists_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cinestream_lists_change", callback);
  };
}

const emptySubscribe = () => () => {};

let cachedFavs: StoredMediaItem[] = [];
let cachedFavsRaw: string | null = null;
function getFavsSnapshot(): StoredMediaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    if (raw !== cachedFavsRaw) {
      cachedFavsRaw = raw;
      cachedFavs = raw ? JSON.parse(raw) : [];
    }
    return cachedFavs;
  } catch {
    return cachedFavs;
  }
}

let cachedWatch: StoredMediaItem[] = [];
let cachedWatchRaw: string | null = null;
function getWatchSnapshot(): StoredMediaItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.watchlist);
    if (raw !== cachedWatchRaw) {
      cachedWatchRaw = raw;
      cachedWatch = raw ? JSON.parse(raw) : [];
    }
    return cachedWatch;
  } catch {
    return cachedWatch;
  }
}

let cachedHist: HistoryItem[] = [];
let cachedHistRaw: string | null = null;
function getHistSnapshot(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.history);
    if (raw !== cachedHistRaw) {
      cachedHistRaw = raw;
      cachedHist = raw ? JSON.parse(raw) : [];
    }
    return cachedHist;
  } catch {
    return cachedHist;
  }
}

const emptyList: never[] = [];
function getServerSnapshot() {
  return emptyList;
}

function writeStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("cinestream_lists_change"));
  } catch {}
}

export function useUserLists() {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const favorites = React.useSyncExternalStore(
    subscribe,
    getFavsSnapshot,
    getServerSnapshot
  );

  const watchlist = React.useSyncExternalStore(
    subscribe,
    getWatchSnapshot,
    getServerSnapshot
  );

  const history = React.useSyncExternalStore(
    subscribe,
    getHistSnapshot,
    getServerSnapshot
  );

  const toStoredItem = (item: MediaItem | StoredMediaItem): StoredMediaItem => ({
    id: String(item.id),
    title: item.title,
    posterUrl: item.posterUrl,
    backdropUrl: item.backdropUrl,
    mediaType: item.mediaType,
    releaseYear: item.releaseYear,
    releaseDate: item.releaseDate,
    rating: item.rating,
    genres: item.genres,
    runtime: item.runtime,
    savedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  const toggleFavorite = React.useCallback((item: MediaItem | StoredMediaItem) => {
    const id = String(item.id);
    const current = getFavsSnapshot();
    const exists = current.some((f) => f.id === id);

    let next: StoredMediaItem[];
    if (exists) {
      next = current.filter((f) => f.id !== id);
    } else {
      next = [toStoredItem(item), ...current];
    }

    writeStorage(STORAGE_KEYS.favorites, next);
  }, []);

  const toggleWatchlist = React.useCallback((item: MediaItem | StoredMediaItem) => {
    const id = String(item.id);
    const current = getWatchSnapshot();
    const exists = current.some((w) => w.id === id);

    let next: StoredMediaItem[];
    if (exists) {
      next = current.filter((w) => w.id !== id);
    } else {
      next = [toStoredItem(item), ...current];
    }

    writeStorage(STORAGE_KEYS.watchlist, next);
  }, []);

  const inFavorites = React.useCallback(
    (id: string | number) => {
      const strId = String(id);
      return favorites.some((f) => f.id === strId);
    },
    [favorites]
  );

  const inWatchlist = React.useCallback(
    (id: string | number) => {
      const strId = String(id);
      return watchlist.some((w) => w.id === strId);
    },
    [watchlist]
  );

  const addToHistory = React.useCallback((item: MediaItem | StoredMediaItem) => {
    const id = String(item.id);
    const current = getHistSnapshot();
    const filtered = current.filter((h) => h.id !== id);

    const newEntry: HistoryItem = {
      ...toStoredItem(item),
      viewedAt: "Just now",
      timestamp: Date.now(),
    };

    const next = [newEntry, ...filtered].slice(0, 50);
    writeStorage(STORAGE_KEYS.history, next);
  }, []);

  const clearHistory = React.useCallback(() => {
    writeStorage(STORAGE_KEYS.history, []);
  }, []);

  const clearFavorites = React.useCallback(() => {
    writeStorage(STORAGE_KEYS.favorites, []);
  }, []);

  const clearWatchlist = React.useCallback(() => {
    writeStorage(STORAGE_KEYS.watchlist, []);
  }, []);

  const clearAllData = React.useCallback(() => {
    clearFavorites();
    clearWatchlist();
    clearHistory();
  }, [clearFavorites, clearWatchlist, clearHistory]);

  return {
    mounted,
    favorites,
    watchlist,
    history,
    inFavorites,
    inWatchlist,
    toggleFavorite,
    toggleWatchlist,
    addToHistory,
    clearHistory,
    clearFavorites,
    clearWatchlist,
    clearAllData,
  };
}
