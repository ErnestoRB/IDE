import { invoke } from "@tauri-apps/api";
import { Cursor } from "./scan";

export interface SymbolData {
  mem_location: number;
  declaration: Cursor;
  usages: SymbolReference[];
}

export interface SymbolReference {
  cursor: Cursor;
}

type SymbolTable = Record<string, SymbolData>;

export interface SymbolError {
  cursor: Cursor;
  message: string;
}

export type AnalyzeOutput = [SymbolTable, SymbolError[]];

export function analyzeFile(string: string) {
  return invoke<AnalyzeOutput>("vainilla_analyze", { contents: string }).then(
    (result) => {
      return result;
    }
  );
}
