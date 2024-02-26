import { create } from "zustand";

export interface ILayoutStore {
  showLateral: boolean;
  setShowLateral: (show: boolean) => unknown;
  toggleLateral: () => unknown;
}
export const useLayoutStore = create<ILayoutStore>((set, get) => ({
  showLateral: false,
  setShowLateral: (show: boolean) => set({ showLateral: show }),
  toggleLateral: () => set({ showLateral: !get().showLateral }),
}));
