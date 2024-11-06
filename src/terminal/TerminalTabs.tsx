import { IconType } from "react-icons";
import {
  GoAlert,
  GoBook,
  GoFileBinary,
  GoNote,
  GoQuote,
  GoTable,
  GoTerminal,
} from "react-icons/go";
import { TerminalContainer } from "./Tabs/TerminalContainer";
import { Lexico } from "./Tabs/Lexico";
import { Sintactico } from "./Tabs/Sintactico/Sintactico";
import { Semantico } from "./Tabs/Semantico";
import { Intermedio } from "./Tabs/Intermedio";
import { Errores } from "./Tabs/Errores";
import { Simbolos } from "./Tabs/Simbolos";

export type TabItem = {
  name: string;
  icon: IconType;
  content: React.ReactNode;
};

export const Tabs: TabItem[] = [
  {
    name: "Terminal",
    icon: GoTerminal,
    content: <TerminalContainer></TerminalContainer>,
  },
  {
    name: "Lexico",
    icon: GoNote,
    content: <Lexico></Lexico>,
  },
  {
    name: "Sintactico",
    icon: GoQuote,
    content: <Sintactico></Sintactico>,
  },
  {
    name: "Semantico",
    icon: GoBook,
    content: <Semantico></Semantico>,
  },
  {
    name: "Codigo Intermedio",
    icon: GoFileBinary,
    content: <Intermedio></Intermedio>,
  },
  {
    name: "Errores",
    icon: GoAlert,
    content: <Errores></Errores>,
  },
  {
    name: "Tabla de simbolos",
    icon: GoTable,
    content: <Simbolos></Simbolos>,
  },
];
