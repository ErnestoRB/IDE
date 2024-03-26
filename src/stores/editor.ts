import { create } from "zustand";
import { editor } from "monaco-editor";
import { VAINILLA_THEME, VAINILLA_THEME_DARK } from "../monaco/vainilla";
import { persist } from "zustand/middleware";

export interface IEditorStore {
  theme: string;
  editor?: editor.IStandaloneCodeEditor;
  setEditor: (editor: editor.IStandaloneCodeEditor) => unknown;
  line: number;
  col: number;
  toggleTheme: (dark: boolean) => any;
  setCursor: (line: number, col: number) => unknown;
}

export const useEditor = create<IEditorStore>()(
  persist(
    (set) => ({
      theme: VAINILLA_THEME,
      toggleTheme: (dark: boolean) =>
        set({ theme: dark ? VAINILLA_THEME_DARK : VAINILLA_THEME }),
      editor: undefined,
      setEditor: (editor: editor.IStandaloneCodeEditor) => set({ editor }),
      col: 1,
      line: 1,
      setCursor: (line: number, col: number) => set({ line, col }),
    }),
    {
      name: "editor",
      partialize: (s) =>
        Object.fromEntries(
          Object.entries(s).filter(([key]) => ["theme"].includes(key))
        ),
    }
  )
);
