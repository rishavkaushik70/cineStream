"use client";

import * as React from "react";
import { MediaItem } from "@/lib/types/movie";
import { useUserLists } from "@/lib/hooks/use-user-lists";

export function HistoryTracker({ item }: { item: MediaItem }) {
  const { addToHistory } = useUserLists();

  React.useEffect(() => {
    if (item && item.id) {
      addToHistory(item);
    }
  }, [item, addToHistory]);

  return null;
}

