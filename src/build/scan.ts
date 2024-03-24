import { invoke } from "@tauri-apps/api";

export function scanFile(string: string) {
  return invoke("vainilla_tokenize", { contents: string });
}