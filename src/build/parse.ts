import { invoke } from "@tauri-apps/api";
import { ScanError, Token } from "./scan";
type Option<T> = T | null;
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

interface TreeNode {
  children: TreeNode[];
  sibling: Option<TreeNode>;
  node: Node;
}

interface StmtKindIf {
  condition: Node;
  then_branch: Option<TreeNode>;
  else_branch: Option<TreeNode>;
}

interface StmtKindWhile {
  condition: Node;
  body: Option<TreeNode>;
}

interface StmtKindDo {
  body: Option<TreeNode>;
  condition: Node;
}

interface StmtKindAssign {
  name: string;
  value: Node;
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

type ExpType = "Void" | "Integer" | "Boolean";

type Node =
  | { Stmt: StmtKind }
  | { Exp: { kind: ExpKind; typ: ExpType } }
  | { Decl: DeclKind };

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
