import { useState, useEffect, useCallback } from "react";

/**
 * useTheme Hook - Senior Level Implementation
 * Handles "light" | "dark" theme persistent state.
 * Manages body classes (theme-light / theme-dark) and localStorage.
 */
export const useTheme = () => {
  // 1. Determine initial theme
  const getInitialTheme = () => {
    // Check local storage first
    const savedTheme = localStorage.getItem("hoda-theme");
    if (savedTheme) return savedTheme;

    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // 2. Synchronize theme with DOM (body class) and Storage
  useEffect(() => {
    const root = window.document.body;

    // Remove both to ensure a clean state before adding
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);

    // Persist to storage
    localStorage.setItem("hoda-theme", theme);
  }, [theme]);

  // 3. Accessible toggle function
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
  };
};
