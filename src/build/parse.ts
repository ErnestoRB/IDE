import { invoke } from "@tauri-apps/api";
import { ScanError, Token } from "./scan";
import { ExpValue } from "./analyze";
export type Option<T> = T | null;
type TokenType = string;

interface ParseError {
  current_token?: Token;
  expected_token_type?: string;
  message: string;
}

interface CompilationError {
  Parse?: ParseError[];
  Scan?: ScanError[];
}

export interface TreeNode {
  // children: TreeNode[];
  sibling: Option<TreeNode>;
  node: Node;
}

interface StmtKindIf {
  condition: TreeNode;
  then_branch: Option<TreeNode>;
  else_branch: Option<TreeNode>;
}

interface StmtKindWhile {
  condition: TreeNode;
  body: Option<TreeNode>;
}

interface StmtKindDo {
  body: Option<TreeNode>;
  condition: TreeNode;
}

interface StmtKindAssign {
  name: string;
  value: TreeNode;
}

interface StmtKindIn {
  name: string;
}

interface StmtKindOut {
  expression: Node;
}

type StmtKind =
  | { If: StmtKindIf }
  | { While: StmtKindWhile }
  | { Do: StmtKindDo }
  | { Assign: StmtKindAssign }
  | { In: StmtKindIn }
  | { Out: StmtKindOut };

interface ExpKindOp {
  op: TokenType;
  left: Node;
  right: Node;
}

interface ExpKindConst {
  value: number;
}

interface ExpKindConstF {
  value: number;
}

interface ExpKindId {
  name: string;
}

type ExpKind =
  | { Op: ExpKindOp }
  | { Const: ExpKindConst }
  | { ConstF: ExpKindConstF }
  | { Id: ExpKindId };

type ExpType = "Void" | "Integer" | "Float" | "Boolean";

export type Node =
  | { Stmt: { kind: StmtKind; id: string } }
  | { Exp: { kind: ExpKind; typ: ExpType; val: ExpValue; id: string } }
  | { Decl: { kind: DeclKind; id: string } };

interface DeclKindVar {
  typ: TokenType;
  name: string;
}

type DeclKind = { Var: DeclKindVar };

export type ParseOutput = [Option<TreeNode>, CompilationError];

// aqui crear interfaces
export function parseFile(string: string) {
  return invoke<ParseOutput>("vainilla_parse", { contents: string });
}
