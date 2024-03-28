import { useEffect, useRef, useState } from "react";
import { getAvailableShells, getShellCommand, isPrintable } from "../backend";
import { useTerminalStore } from "../../stores/terminal";
import { Child, ChildProcess } from "@tauri-apps/api/shell";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";

import "@xterm/xterm/css/xterm.css";
export function TerminalComponent() {
  const shells = useTerminalStore((s) => s.availableTerminals);
  const shell = useTerminalStore((s) => s.terminal);
  const setTerminal = useTerminalStore((s) => s.setTerminal);
  const processRef = useRef<Child>();
  const terminalDivRef = useRef<HTMLDivElement>(null!);
  const terminalRef = useRef<Terminal | undefined>(undefined);
  const nextCommand = useRef<string>("");

  useEffect(() => {
    if (shell) {
      getShellCommand().then((cmd) => {
        cmd.stdout.addListener("data", (s: string) => {
          console.log(`Data: '${s}'`);
          terminalRef.current?.write(s);
        });
        cmd.stderr.addListener("data", (s) => {
          console.log(`Data stderr: '${s}'`);
          terminalRef.current?.write(s);
        });
        cmd.on("close", (data) => {
          console.log("Child closed");
          console.log(data);
        });
        cmd.on("error", (error) => {
          console.log("Child had an error");
          console.error(error);
        });
        cmd.spawn().then((child) => {
          console.log(
            `Comando spawneado ${useTerminalStore.getState().terminal}`
          );
          terminalRef.current?.clear();
          processRef.current = child;
        });
      });
    }
  }, [shell]);

  useEffect(() => {
    return () => {
      processRef.current
        ?.kill()
        .then(() => {
          terminalRef.current?.clear();
          terminalRef.current?.writeln("Terminal cerrada");
          processRef.current = undefined;
        })
        .finally(() => (processRef.current = undefined));
    };
  }, []);

  useEffect(() => {
    console.log("Creando xterm");
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    terminalRef.current = term;
    term.open(terminalDivRef.current!);
    // Aquí puedes configurar el terminal, por ejemplo, temas, tamaño de fuente, etc.
    // Consulta la documentación de xterm.js para más detalles: https://xtermjs.org/docs/api/terminal/
    term.onData((data: string) => {
      // Aquí puedes procesar la entrada del usuario
      if (data === "\r") {
        // Si es un retorno de carro, puedes enviar la entrada para su procesamiento
        console.log("Input received:", nextCommand.current);
        processRef.current?.write(nextCommand.current + "\n");
        nextCommand.current = "";
        term.writeln("");
      } else if (data === "\x7f") {
        // Si es un retroceso (backspace), eliminamos el último carácter de la línea actual
        term.write("\b \b");
        nextCommand.current = nextCommand.current.slice(
          0,
          nextCommand.current.length - 1
        );
      } else if (isPrintable(data)) {
        // De lo contrario, simplemente escribimos el carácter en la terminal
        nextCommand.current = `${nextCommand.current}${data}`;
        term.write(data);
      }
      fitAddon.fit();
      // Puedes enviar la entrada a tu backend, analizarla, etc.
    });
    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className="p-2 font-mono text-white w-full bg-stone-800 h-full flex flex-col justify-end overflow-y-auto overflow-x-hidden ">
      <div>
        Shells disponibles
        <select
          className="mx-2 text-black"
          onChange={(s) => setTerminal(s.currentTarget.value)}
        >
          {shells?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            processRef.current
              ?.kill()
              .then(() => {
                console.log("Killed");
                terminalRef.current?.clear();
                terminalRef.current?.writeln("Terminal cerrada");
                processRef.current = undefined;
              })
              .catch(() => console.error("Not killed"))
          }
        >
          Kill
        </button>
      </div>

      <div className="flex-1 overflow-y-hidden">
        <div className="w-full h-full overflow-y-auto" ref={terminalDivRef} />
      </div>
    </div>
  );
}
