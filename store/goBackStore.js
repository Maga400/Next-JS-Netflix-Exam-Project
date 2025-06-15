import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGoBackStore = create(
  persist(
    (set, get) => ({
      ids: [],
      addId: (id) =>
        set((state) => ({
          ids: [...state.ids, id],
        })),

      removeLastId: () =>
        set((state) => ({
          ids: state.ids.slice(0, -1),
        })),

      getLastId: () => {
        const { ids } = get();
        return ids.length > 0 ? ids[ids.length - 1] : null;
      },

      getPreviousToLastId: () => {
        const { ids } = get();
        const count = ids.length - 2;
        return ids.length > 0
          ? ids[count == -1 ? ids[0] : ids.length - 2]
          : null;
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
