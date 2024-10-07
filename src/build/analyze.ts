import { invoke } from "@tauri-apps/api";
import { Cursor } from "./scan";
import { TreeNode } from "./parse";

export interface SymbolData {
  mem_location: number;
  typ: string;
  value: ExpValue;
  declaration: Cursor;
  usages: SymbolReference[];
}

export type ExpValue =
  | { Int: number }
  | { Float: number }
  | { Boolean: boolean }
  | null;

export interface SymbolReference {
  cursor: Cursor;
}

type SymbolTable = Record<string, SymbolData>;

export interface AnalyzeError {
  cursor: Cursor;
  message: string;
}

export type AnalyzeOutput = [SymbolTable, AnalyzeError[], TreeNode];

export function getExpValueAsString(value: ExpValue): string {
  if (!value) {
    return "Valor no establecido";
  }
  if ("Int" in value) {
    return "Integer: " + value.Int;
  }
  if ("Float" in value) {
    return "Float: " + value.Float;
  }
  if ("Boolean" in value) {
    return "Boolean: " + value.Boolean;
  }
  return "Tipo desconocido";
}

export function analyzeFile(string: string) {
  return invoke<AnalyzeOutput>("vainilla_analyze", { contents: string }).then(
    (result) => {
      console.log(result);
      return result;
    }
  );
}
