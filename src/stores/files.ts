import { create } from "zustand";
import { IFileItem } from "../side/content/FileHierachy";
import { persist } from "zustand/middleware";
import { ScanOutput } from "../build/scan";

export type IFileContent = IFileItem & {
  content: string;
};

interface IFileStore {
  files: IFileContent[];
  setFiles: (files: IFileContent[]) => unknown;
  activeFile?: IFileContent;
  setActiveFile: (file: IFileContent) => unknown;
  lexicoResult: ScanOutput | null;
}

export const useFileStore = create<IFileStore>()(
  persist(
    (set) => ({
      files: [],
      activeFile: undefined,
      setFiles: (files) => set({ files }),
      setActiveFile: (file) => set({ activeFile: file }),
      lexicoResult: null,
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
