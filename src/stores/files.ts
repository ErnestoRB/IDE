import { create } from "zustand";
import { IFileItem } from "../side/content/FileHierachy";
import { persist } from "zustand/middleware";
import { ScanOutput } from "../build/scan";
import { ParseOutput } from "../build/parse";
import { AnalyzeOutput } from "../build/analyze";
import { readTextFile } from "@tauri-apps/api/fs";

export type IFileContent = IFileItem & {
  content?: string;
  originalContent?: string;
};

interface IFileStore {
  folder?: string;
  setFolder: (folder?: string) => unknown;
  /**
   * Open files
   */
  files: IFileContent[];
  setFiles: (files: IFileContent[]) => unknown;
  activeFile?: IFileContent;
  /**
   *
   * @param path Ruta del archivo a "abrir"
   * @returns
   */
  setActiveFile: (path: string) => unknown;
  setFileOriginalContents: (path: string, content: string) => unknown;
  setFileContents: (path: string, content: string) => unknown;
  closeFile: () => unknown;
  lexicoResult: ScanOutput | null;
  sintacticoResult: ParseOutput | null;
  semanticoResult: AnalyzeOutput | null;
  generatedCode: string | null;
  setLexicoResult: (output: ScanOutput | null) => any;
  setSintacticoResult: (output: ParseOutput | null) => any;
  setSemanticoResult: (output: AnalyzeOutput | null) => any;
  setGeneratedCode: (code: string | null) => any;
  clearResults: () => unknown;
}

export const useFileStore = create<IFileStore>()(
  persist(
    (set, get) => ({
      folder: undefined,
      closeFile: () => {
        set({
          activeFile: undefined,
        });
      },
      clearResults() {
        set({
          lexicoResult: null,
          sintacticoResult: null,
          semanticoResult: null,
          generatedCode: null,
        });
      },
      setFolder: (folder) => set({ folder }),
      files: [],
      activeFile: undefined,
      setFileContents(path, content) {
        const state = get();
        const file = state.files.find((f) => f.path === path);
        if (file) {
          file.content = content;
          set({ files: [...state.files] });

          set({ activeFile: { ...file } });
        } else {
          console.error("No se encontró el archivo");
        }
      },
      setFileOriginalContents(path, content) {
        const state = get();
        const file = state.files.find((f) => f.path === path);
        if (file) {
          file.originalContent = content;
          set({ files: state.files });
          set({ activeFile: { ...file } });
        } else {
          console.error("No se encontró el archivo");
        }
      },
      setFiles: (files) => set({ files }),
      setActiveFile: (path) => {
        const state = get();
        const currentActive = state.activeFile;
        if (currentActive && currentActive.path === path) return;
        const activeFile = state.files.find((f) => f.path === path);
        set({ activeFile });
        if (activeFile) {
          readTextFile(activeFile.path)
            .then((content) => {
              get().setFileOriginalContents(activeFile.path, content);
              get().setFileContents(activeFile.path, content);
            })
            .catch(() => {
              console.error("Error reading file content");
            });
        } else {
          console.error(
            "Este archivo no ha sido abierto. Parece que es un bug o un estado mal manejado"
          );
        }
      },
      lexicoResult: null,
      sintacticoResult: null,
      semanticoResult: null,
      generatedCode: null,
      setLexicoResult: (output: ScanOutput | null) =>
        set({ lexicoResult: output }),
      setSintacticoResult: (output: any) => set({ sintacticoResult: output }),
      setSemanticoResult: (output: AnalyzeOutput | null) =>
        set({ semanticoResult: output }),
      setGeneratedCode(code) {
        set({ generatedCode: code });
      },
    }),
    {
      name: "files",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["lexicoResult"].includes(key)
          )
        ),
    }
  )
);
