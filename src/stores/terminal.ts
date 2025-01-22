import { ReactNode } from "react";
import { create } from "zustand";
import { buildShellFunctions } from "../terminal/backend";

export type ShellFunctions = ReturnType<typeof buildShellFunctions>;

export interface ITerminalItem {
  shell: string;
  ttyId: number;
  ttyFunctions: ReturnType<typeof buildShellFunctions>;
  component: ReactNode;
}

interface ITerminalStore {
  shell?: string;
  availableShells?: string[];
  setDefaultShell: (terminal: string) => any;
  setTerminals: (terminals: ITerminalItem[]) => any;
  appendTerminal: (terminal: ITerminalItem) => any;
  removeTerminal: (ttyId: number) => any;
  terminals: ITerminalItem[];
  setAvailableShells: (terminals: string[]) => any;
  activeTerminal?: ITerminalItem;
  activeTerminalIndex: number;
  setActiveTerminalIndex: (index: number) => any;
  setActiveTerminal: (terminal?: ITerminalItem) => any;
}

export const useTerminalStore = create<ITerminalStore>((set) => ({
  shell: undefined,
  activeTerminal: undefined,
  activeTerminalIndex: 0,
  appendTerminal(terminal) {
    set((state) => ({ terminals: [...state.terminals, terminal] }));
  },
  removeTerminal(ttyId) {
    set((state) => ({
      terminals: state.terminals.filter((t) => t.ttyId != ttyId),
      activeTerminal:
        state.activeTerminal?.ttyId === ttyId
          ? undefined
          : state.activeTerminal,
      activeTerminalIndex: undefined,
    }));
  },
  setActiveTerminalIndex(index) {
    set({ activeTerminalIndex: index });
  },
  setActiveTerminal(terminal) {
    set({ activeTerminal: terminal });
  },
  availableShells: undefined,
  setTerminals(terminals) {
    set({ terminals });
  },
  terminals: [],
  setDefaultShell: (terminal: string) => set({ shell: terminal }),
  setAvailableShells: (terminals: string[]) =>
    set({ availableShells: terminals }),
}));
