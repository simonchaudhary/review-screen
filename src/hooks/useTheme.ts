import { useEffect, useState } from "react";

import { LOCAL_STORAGE_KEY } from "@/constants/localStorage";
import { Theme } from "@/enums/theme";
import { getItem, setItem } from "@/utils/localStorage";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or default to 'system'
    const savedTheme = getItem(LOCAL_STORAGE_KEY.DARK_MODE) as Theme;
    return savedTheme || Theme.SYSTEM;
  });

  useEffect(() => {
    // Determine the actual theme based on the selected mode
    const isDark =
      theme === Theme.DARK ||
      (theme === Theme.SYSTEM &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Toggle 'dark' class
    if (isDark) {
      document.documentElement.classList.add(Theme.DARK);
    } else {
      document.documentElement.classList.remove(Theme.DARK);
    }

    // Save theme preference to localStorage
    setItem(LOCAL_STORAGE_KEY.DARK_MODE, theme);
  }, [theme]);

  useEffect(() => {
    // Handle system theme changes when 'system' mode is selected
    if (theme === Theme.SYSTEM) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle(Theme.DARK, e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      // Initial check
      document.documentElement.classList.toggle(Theme.DARK, mediaQuery.matches);

      // Cleanup
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [theme]);

  // Method to change theme
  const toggleTheme = (newTheme?: Theme) => {
    setTheme(newTheme || (theme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
