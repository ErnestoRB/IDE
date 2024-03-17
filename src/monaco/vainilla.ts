import { useMonaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";

export const VAINILLA_ID = { id: "vanilla-lang" };

const VAINILLA_LANG: languages.IMonarchLanguage = {
  keywords: ["if", "else", "do", "switch", "while", "case", "main"],
  typeKeywords: ["double", "integer"],
  arithmeticOp: [
    "+", // artitmeticos
    "-",
    "*",
    "/",
    "^",
    "%",
  ],
  relationalOp: [
    ">", // relacionales
    "<",
    "==",
    "<=",
    ">=",
    "!=",
  ],
  logicalOp: ["and", "or"],
  assignment: [
    "=", // asignacion
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  comment: [
    [/[^\/*]+/, "comment"],
    [/\/\*/, "comment", "@push"], // nested comment
    ["\\*/", "comment", "@pop"],
    [/[\/*]/, "comment"],
  ],
  tokenizer: {
    root: [
      [
        /_?[a-zA-Z][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@typeKeywords": "typeKeyword",
            "@logicalOp": "logicalOp",
            "@default": "identifier",
          },
        },
      ], // para identificadores
      [
        /@symbols/,
        {
          cases: {
            "@arithmeticOp": "arithmeticOp", // tokenizar op. aritmeticos
            "@relationalOp": "relationalOp",
            "@assignment": "assignment",
            "@default": "symbols",
          },
        },
      ],
      [/[+-]*\d*\.\d+/, "number.float"], //tokenizar numeros
      [/\d+/, "number"],
      [/\/\//, "comment"], //comentarios
      [/\/\*.*\*\//, "comment"], //comentarios de bloque
    ],
  },
};

export const VAINILLA_THEME = `${VAINILLA_ID.id}-theme`;

export function setupVainilla(monaco: ReturnType<typeof useMonaco>) {
  monaco?.languages.register(VAINILLA_ID);
  monaco?.languages.setMonarchTokensProvider(VAINILLA_ID.id, VAINILLA_LANG);
  monaco?.editor.defineTheme(VAINILLA_THEME, {
    base: "vs",
    inherit: false,
    colors: {},
    rules: [
      { token: "keyword", foreground: "ff7edb", fontStyle: "bold" },
      { token: "typeKeyword", foreground: "ff7edb", fontStyle: "bold" },
      { token: "comment", foreground: "848bbd" },
      { token: "number", foreground: "00ff00" },
      { token: "identifier", foreground: "00bcb2" },
      {
        token: "arithmeticOp",
        foreground: "c75300",
      },
      {
        token: "relationalOp",
        foreground: "656abf",
      },
      {
        token: "logicalOp",
        foreground: "0000ff",
      },
      {
        token: "assignment",
        foreground: "00ff00",
      },
    ],
  });
  monaco?.editor.setTheme(VAINILLA_THEME);

  monaco?.languages.registerCompletionItemProvider(VAINILLA_ID.id, {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        ...VAINILLA_LANG.keywords.map((k: string) => {
          return {
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
          };
        }),
        ...VAINILLA_LANG.typeKeywords.map((k: string) => {
          return {
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
          };
        }),
      ];
      return { suggestions };
    },
  });
}
