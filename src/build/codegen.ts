import { invoke } from "@tauri-apps/api";

export type CodegenOutput = string | null;

export function codegenFile(string: string) {
  return invoke<CodegenOutput>("vainilla_codegen", { contents: string });
}
