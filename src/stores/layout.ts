import { ImperativePanelHandle } from "react-resizable-panels";
import { create } from "zustand";

export interface ILayoutStore {
  lateralPanelRef?: ImperativePanelHandle;
  terminalPanelRef?: ImperativePanelHandle;
  setTerminalPanelRef: (ref: ImperativePanelHandle) => unknown;
  setLateralPanelRef: (ref: ImperativePanelHandle) => unknown;
  commandPanel: boolean;
  showCommand: (show: boolean) => unknown;
  toggleCommand: () => unknown;
}
export const useLayoutStore = create<ILayoutStore>((set, get) => ({
  setTerminalPanelRef: (ref: ImperativePanelHandle) =>
    set({ terminalPanelRef: ref }),
  setLateralPanelRef: (ref: ImperativePanelHandle) =>
    set({ lateralPanelRef: ref }),
  commandPanel: false,
  showCommand: (show: boolean) => set({ commandPanel: show }),
  toggleCommand: () => set({ commandPanel: !get().commandPanel }),
}));
