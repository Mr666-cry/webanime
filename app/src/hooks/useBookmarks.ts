import { useState, useEffect, useCallback } from 'react';
import type { Bookmark } from '@/types/anime';

const BOOKMARKS_KEY = 'nimestream_bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((anime: {
    animeId: string;
    title: string;
    poster: string;
    status: string;
    type: string;
    score: string;
  }) => {
    setBookmarks(prev => {
      if (prev.some(b => b.animeId === anime.animeId)) {
        return prev;
      }
      return [...prev, {
        ...anime,
        addedAt: Date.now(),
      }];
    });
  }, []);

  const removeBookmark = useCallback((animeId: string) => {
    setBookmarks(prev => prev.filter(b => b.animeId !== animeId));
  }, []);

  const isBookmarked = useCallback((animeId: string) => {
    return bookmarks.some(b => b.animeId === animeId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((anime: {
    animeId: string;
    title: string;
    poster: string;
    status: string;
    type: string;
    score: string;
  }) => {
    if (isBookmarked(anime.animeId)) {
      removeBookmark(anime.animeId);
    } else {
      addBookmark(anime);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    isLoaded,
  };
};
