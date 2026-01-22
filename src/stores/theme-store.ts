import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  detectTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  detectTheme: () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDark) {
      set({ theme: "dark" });
    } else {
      set({ theme: "light" });
    }
  },
}));
