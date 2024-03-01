import { create } from "zustand";
import { editor } from "monaco-editor";

export interface IEditorStore {
  editor?: editor.IStandaloneCodeEditor;
  setEditor: (editor: editor.IStandaloneCodeEditor) => unknown;
  line: number;
  col: number;
  setCursor: (line: number, col: number) => unknown;
}

export const useEditor = create<IEditorStore>((set) => ({
  editor: undefined,
  setEditor: (editor: editor.IStandaloneCodeEditor) => set({ editor }),
  col: 1,
  line: 1,
  setCursor: (line: number, col: number) => set({ line, col }),
}));
