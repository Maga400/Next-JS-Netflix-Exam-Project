import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: false,
      themeToggle: () => set((state) => ({ theme: !state.theme })),
    }),
    {
      name: "theme-storage",
    }
  )
);
