import { invoke } from "@tauri-apps/api";

interface Token {
  token_type: string;
  lexemme: string;
}

interface Cursor {
  col: number;
  lin: number;
}

interface ScanError {
  position: Cursor;
  message: string;
  lexemme: string;
}

export type ScanOutput = [Token[], ScanError[]];

export function scanFile(string: string) {
  return invoke<ScanOutput>("vainilla_tokenize", { contents: string });
}
