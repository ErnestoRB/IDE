import { create } from "zustand";
import { IFileItem } from "../side/content/FileHierachy";
import { persist } from "zustand/middleware";

export type IFileContent = IFileItem & {
  content: string;
};

interface IFileStore {
  files: IFileContent[];
  setFiles: (files: IFileContent[]) => unknown;
  activeFile?: IFileContent;
  setActiveFile: (file: IFileContent) => unknown;
  lexicoResult: string | null | unknown;
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
    { name: "files" }
  )
);
