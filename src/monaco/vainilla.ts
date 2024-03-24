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

export function setupVainilla(monaco: ReturnType<typeof useMonaco>, darkTheme: boolean) {
  monaco?.languages.register(VAINILLA_ID);
  monaco?.languages.setMonarchTokensProvider(VAINILLA_ID.id, VAINILLA_LANG);

  const theme = darkTheme ? VAINILLA_THEME_DARK : VAINILLA_THEME;

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

  monaco?.editor.defineTheme(VAINILLA_THEME_DARK, {
    base: "vs-dark",
    inherit: false,
    colors: {
      "editor.foreground": "#ABB2BF",
      "editor.background": "#282C34",
      "editor.selectionBackground": "#3E4451",
      "editor.lineHighlightBackground": "#2C313A",
      "editorCursor.foreground": "#528BFF",
      "editorWhitespace.foreground": "#3B4048",
    },
    rules: [
      { token: "keyword", foreground: "ff9d00", fontStyle: "bold" },
      { token: "typeKeyword", foreground: "ff9d00", fontStyle: "bold" },
      { token: "comment", foreground: "5c6370" },
      { token: "number", foreground: "3db0a5" },
      { token: "identifier", foreground: "dcdcaa" },
      { token: "arithmeticOp", foreground: "dcdcaa" },
      { token: "relationalOp", foreground: "dcdcaa" },
      { token: "logicalOp", foreground: "dcdcaa" },
      { token: "assignment", foreground: "3db0a5" },
    ],
  });


  monaco?.editor.setTheme(theme);

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
