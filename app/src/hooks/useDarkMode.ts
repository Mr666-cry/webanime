import { useState, useEffect } from 'react';

const DARK_MODE_KEY = 'nimestream_dark_mode';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    if (stored !== null) {
      setIsDarkMode(stored === 'true');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode, isLoaded]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    isLoaded,
  };
};
