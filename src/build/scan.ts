import { invoke } from "@tauri-apps/api";

export interface Token {
  token_type: string;
  lexemme: string;
  start: Cursor;
  end: Cursor;
}

interface Cursor {
  col: number;
  lin: number;
}

export interface ScanError {
  start: Cursor;
  end: Cursor;
  message: string;
  lexemme: string;
}

export type ScanOutput = [Token[], ScanError[]];

export function scanFile(string: string) {
  return invoke<ScanOutput>("vainilla_tokenize", { contents: string }).then(
    (result) => {
      const filteredTokens = result[0].filter(
        (t) => !["INLINE_COMMENT", "BLOCK_COMMENT"].includes(t.token_type)
      );

      return [filteredTokens, result[1]] as ScanOutput;
    }
  );
}
