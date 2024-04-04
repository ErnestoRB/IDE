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
  return invoke<ScanOutput>("vainilla_tokenize", { contents: string }).then(result => {
    const filteredTokens = result[0].filter(t => !["INLINE_COMMENT", "BLOCK_COMMENT"].includes(t.token_type))

    return [filteredTokens, result[1]]
  });
}
