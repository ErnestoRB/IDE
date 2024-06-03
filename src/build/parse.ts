import { invoke } from "@tauri-apps/api";

// aqui crear interfaces
export function parseFile(string: string) {
  return invoke<any>("vainilla_parse", { contents: string });
}
