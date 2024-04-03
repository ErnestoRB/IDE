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
      { include: "@whitespace" },

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
      // whitespace
      [/[+-]*\d*\.\d+/, "number.float"], //tokenizar numeros
      [/\d+/, "number"],
    ],
    comment: [
      [/[^\/*]+/, "comment"],
      // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
      // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],
    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],
  },
};

export const VAINILLA_THEME = `${VAINILLA_ID.id}-theme`;
export const VAINILLA_THEME_DARK = `${VAINILLA_ID.id}-dark-theme`;

export function setupVainilla(monaco: ReturnType<typeof useMonaco>) {
  monaco?.languages.register(VAINILLA_ID);
  monaco?.languages.setMonarchTokensProvider(VAINILLA_ID.id, VAINILLA_LANG);

  monaco?.editor.defineTheme(VAINILLA_THEME, {
    base: "vs",
    inherit: false,
    colors: {},
    rules: [
      { token: "keyword", foreground: "ff7edb", fontStyle: "bold" }, // color 4
      { token: "typeKeyword", foreground: "ff7edb", fontStyle: "bold" },
      { token: "comment", foreground: "848bbd" }, // color 3
      { token: "number", foreground: "9f6dff" }, // color 1
      { token: "identifier", foreground: "00bcb2" }, // color 2
      {
        token: "arithmeticOp", // color 5
        foreground: "ff3d2a",
      },
      {
        token: "relationalOp", // color 6
        foreground: "566ef7",
      },
      {
        token: "logicalOp",
        foreground: "0000ff",
      },
      {
        token: "assignment",
        foreground: "000000",
      },
    ],
  });

  monaco?.editor.defineTheme(VAINILLA_THEME_DARK, {
    base: "vs-dark",
    inherit: false,
    colors: {
      "editor.foreground": "#ABB2BF",
      "editor.background": "#212337",
      "editor.selectionBackground": "#3E4451",
      "editor.lineHighlightBackground": "#2C313A",
      "editorCursor.foreground": "#528BFF",
      "editorWhitespace.foreground": "#3B4048",
    },
    rules: [
      { token: "keyword", foreground: "c099ff", fontStyle: "bold" }, 
      { token: "typeKeyword", foreground: "c099ff", fontStyle: "bold" },
      { token: "comment", foreground: "8a91d1" }, 
      { token: "number", foreground: "ff98a4" }, 
      { token: "identifier", foreground: "a5d7e8" }, 
      {
        token: "arithmeticOp", 
        foreground: "f2f7a1",
      },
      {
        token: "relationalOp",
        foreground: "f73d93",
      },
      {
        token: "logicalOp",
        foreground: "e2703a",
      },
      {
        token: "assignment",
        foreground: "ffffff",
      },
    ],
  });

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
