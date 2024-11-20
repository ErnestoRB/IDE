import { invoke } from "@tauri-apps/api";
import { IFileContent, useFileStore } from "../stores/files";
import { writeFile } from "@tauri-apps/api/fs";

export type CodegenOutput = string | null;

export async function codegenFile(
  save: boolean = false
): Promise<CodegenOutput> {
  const activeFile = useFileStore.getState().activeFile;
  if (!activeFile) {
    return null;
  }
  const { path, content } = activeFile;
  const vmPath = path.replace(/\.[^/.]+$/, ".vm");
  const codegen = await invoke<CodegenOutput>("vainilla_codegen", {
    contents: content,
  });
  if (codegen && save) {
    await writeFile(vmPath, codegen);
  }

  return codegen;
}
