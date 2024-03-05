import { ImperativePanelHandle } from "react-resizable-panels";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ILayoutStore {
  lateralPanelRef?: ImperativePanelHandle;
  terminalPanelRef?: ImperativePanelHandle;
  setTerminalPanelRef: (ref: ImperativePanelHandle) => unknown;
  setLateralPanelRef: (ref: ImperativePanelHandle) => unknown;
  commandPanel: boolean;
  showCommand: (show: boolean) => unknown;
  toggleCommand: () => unknown;
  showNavbar: boolean;
  toggleNavbar: () => unknown;
}
export const useLayoutStore = create<ILayoutStore>()(
  persist(
    (set, get) => ({
      setTerminalPanelRef: (ref: ImperativePanelHandle) =>
        set({ terminalPanelRef: ref }),
      setLateralPanelRef: (ref: ImperativePanelHandle) =>
        set({ lateralPanelRef: ref }),
      commandPanel: false,
      showCommand: (show: boolean) => set({ commandPanel: show }),
      toggleCommand: () => set({ commandPanel: !get().commandPanel }),
      showNavbar: true,
      toggleNavbar: () => set({ showNavbar: !get().showNavbar }),
    }),
    {
      name: "layout",
      partialize: (state) => ({ showNavbar: state.showNavbar }),
    }
  )
);
