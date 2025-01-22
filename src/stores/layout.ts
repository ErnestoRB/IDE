import { ReactNode } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ILayoutStore {
  lateralPanelRef?: ImperativePanelHandle;
  terminalPanelRef?: ImperativePanelHandle;
  setTerminalPanelRef: (ref: ImperativePanelHandle) => unknown;
  setLateralPanelRef: (ref: ImperativePanelHandle) => unknown;
  isModalOpen: boolean;
  closeModal: () => unknown;
  openModal: (content: React.ReactNode) => unknown;
  modalContent?: React.ReactNode;
  showNavbar: boolean;
  toggleNavbar: () => unknown;
  activeTab: number;
  setActiveTab: (tab: number) => unknown;
}
export const useLayoutStore = create<ILayoutStore>()(
  persist(
    (set, get) => ({
      setTerminalPanelRef: (ref: ImperativePanelHandle) =>
        set({ terminalPanelRef: ref }),
      setLateralPanelRef: (ref: ImperativePanelHandle) =>
        set({ lateralPanelRef: ref }),
      isModalOpen: false,
      openModal: (node: ReactNode) => set({ modalContent: node }),
      closeModal: () => set({ isModalOpen: !get().isModalOpen }),
      showNavbar: true,
      toggleNavbar: () => set({ showNavbar: !get().showNavbar }),
      activeTab: 0,
      setActiveTab: (tab: number) => set({ activeTab: tab }),
    }),
    {
      name: "layout",
      partialize: (state) => ({ showNavbar: state.showNavbar }),
    }
  )
);
