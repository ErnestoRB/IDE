import { create } from "zustand";

interface ITerminalStore {
  terminal?: string;
  availableTerminals?: string[];
  setTerminal: (terminal: string) => any;
  setAvailableTerminals: (terminals: string[]) => any;
}

export const useTerminalStore = create<ITerminalStore>((set, get) => ({
  terminal: undefined,
  availableTerminals: undefined,
  setTerminal: (terminal: string) => set({ terminal }),
  setAvailableTerminals: (terminals: string[]) =>
    set({ availableTerminals: terminals }),
}));
