import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VainillaTheme = {
  name: string;
  definition: VainillaThemeDefinition;
};

export type VainillaThemeBaseColors = {
  text: string;
  "primary-1": string;
  "primary-2": string;
  "primary-base": string;
  "primary-4": string;
  "primary-5": string;
};

export type VainillaThemeDefinition = VainillaThemeBaseColors & {
  dropdown: string;
  dropdownItem: string;
  sidebar: string;
  statusBar: string;
  lineBar: string;
  topBar: string;
  topBarButtons: string;
  terminalPanel: string;
  terminalPanelTab: string;
  terminalPanelTabItem: string;
  sidebarPanel: string;
  sidebarButtons: string;
  fileItem: string;
  fileItem__active: string;
  sidebarPanelHeader: string;
  openFileHeader: string;
  openFile: string;
  openFile__active: string;
  openFileButton: string;
  terminalInstance: string;
  //   terminalPanel: string;
};

export const themes: VainillaTheme[] = [
  {
    name: "Púrpura",
    definition: {
      text: "text-white",
      "primary-base": "bg-purple-700",
      "primary-1": "bg-purple-600",
      "primary-2": "bg-purple-500",
      "primary-4": "bg-purple-800",
      "primary-5": "bg-purple-900",
      dropdown: " text-white bg-purple-900",
      dropdownItem: "hover:bg-black",
      sidebar: "bg-purple-800 p-2 box-content",
      sidebarButtons: "bg-purple-900 hover:bg-black rounded-full",
      sidebarPanel: "bg-purple-700",
      sidebarPanelHeader: " bg-purple-900 text-white",
      topBar: "bg-purple-900",
      topBarButtons: "px-2 bg-purple-900 hover:bg-black text-white",
      fileItem: "bg-purple-800 hover:bg-purple-900 text-white",
      fileItem__active: "bg-purple-900 hover:bg-black",
      openFileHeader: "bg-purple-800",
      openFile: "bg-purple-900",
      openFile__active: "",
      terminalPanelTab: " bg-purple-800 text-white items-center gap-x-2",
      terminalPanelTabItem:
        "ui-selected:bg-white ui-selected:text-black rounded-md h-min text-white ui-selected:border-b-2",
      lineBar: " text-white bg-purple-800",
      statusBar: "bg-purple-900 text-white",
      terminalPanel: "text-white bg-purple-800",
      openFileButton: "bg-black active:bg-purple-900 hover:bg-purple-950",
      terminalInstance:
        "border-none rounded-md pl-2 ui-selected:bg-white ui-selected:text-black ui-not-selected:bg-transparent ui-not-selected:text-white ui-selected:border-l-2 hover:opacity-80",
    },
  },
  {
    name: "Clásico",
    definition: {
        text: "text-white",
      "primary-base": "bg-stone-800",
      "primary-1": "bg-stone-700",
      "primary-2": "bg-stone-700",
      "primary-4": "bg-stone-900",
      "primary-5": "bg-stone-950",
      dropdown: " text-white bg-stone-900",
      dropdownItem: "hover:bg-black",
      sidebar: "bg-stone-900",
      sidebarButtons: "bg-stone-950 hover:bg-black",
      sidebarPanel: "bg-stone-700",
      sidebarPanelHeader: " bg-stone-950 text-white",
      topBar: "bg-stone-900",
      topBarButtons: "bg-stone-900 hover:bg-black text-white",
      fileItem: "bg-stone-800 hover:bg-stone-900 text-white ",
      fileItem__active: "bg-stone-900 hover:bg-black",
      openFileHeader: "bg-stone-800",
      openFile: "bg-stone-900",
      openFile__active: "",
      terminalPanelTab: " bg-stone-800 text-white ",
      terminalPanelTabItem: " ui-selected:border-white ui-selected:border-b-2",
      lineBar: " text-white bg-stone-800",
      statusBar: "bg-black text-white",
      terminalPanel: "text-white bg-stone-800",
      openFileButton: "bg-black active:bg-stone-900 hover:bg-stone-950",
      terminalInstance:
        "ui-selected:border-white ui-not-selected:border-none ui-selected:border-l-2 hover:opacity-80",
    },
  },
];

const useThemeStore = create<{
  selectedTheme?: VainillaTheme;
  switchTheme: (newTheme: string) => unknown;
}>()(
  persist(
    (set) => ({
      selectedTheme: themes[0],
      switchTheme(newTheme) {
        set({ selectedTheme: themes.filter((t) => newTheme == t.name)[0] });
      },
    }),
    {
      name: "vainilla-theme",
      partialize: (state) => ({ theme: state.selectedTheme }),
    }
  )
);

export function useVainillaTheme() {
  const switchTheme = useThemeStore((s) => s.switchTheme);
  const selectedTheme = useThemeStore((s) => s.selectedTheme)!;
  return {
    themes,
    selectedTheme,
    switchTheme
  };
}
