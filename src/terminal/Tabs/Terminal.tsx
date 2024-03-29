import { useEffect, useRef, useState } from "react";
import { createShell, killShell, resizePty, sendDataShell } from "../backend";
import { useTerminalStore } from "../../stores/terminal";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";

import "@xterm/xterm/css/xterm.css";
import { listen } from "@tauri-apps/api/event";
import { FaPlus, FaTrash } from "react-icons/fa";
import useResizeObserver from "use-resize-observer";

export function TerminalComponent() {
  const shells = useTerminalStore((s) => s.availableTerminals);
  const shell = useTerminalStore((s) => s.terminal);
  const setTerminal = useTerminalStore((s) => s.setTerminal);
  const terminalDivRef = useRef<HTMLDivElement>(null!);
  const fitAddonRef = useRef<FitAddon | undefined>(undefined);
  const terminalRef = useRef<Terminal | undefined>(undefined);
  const [created, setCreated] = useState(false);

  const { height, ref, width } = useResizeObserver<HTMLDivElement>();

  const onTerminalKill = (code: number) => {
    setCreated(false);
    terminalRef.current?.clear();
    terminalRef.current?.writeln(
      `Terminal terminado con código ${code}, inicia otra terminal`
    );
    console.log("Terminated");
  };

  useEffect(() => {
    if (width && height) {
      if (fitAddonRef.current) {
        fitAddonRef.current?.fit();
        resizePty(terminalRef.current!.rows, terminalRef.current!.cols);
      }
    }
  }, [width, height]);

  useEffect(() => {
    createShell()
      .then(() => console.log("Terminal creada con exito"))
      .finally(() => setCreated(true));
  }, []);

  useEffect(() => {
    if (created) {
      terminalRef.current?.clear();
      const ttyListenPromise = listen("tty", (e) =>
        terminalRef.current?.write(e.payload as string)
      );
      const shellExitPromise = listen("shell-exit", (e) =>
        onTerminalKill(e.payload as number)
      );
      return () => {
        ttyListenPromise.then((u) => u());
        shellExitPromise.then((u) => u());
      };
    }
  }, [created]);

  useEffect(() => {
    console.log("Creando xterm");
    const term = new Terminal({ cols: 80, rows: 24 });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    term.loadAddon(fitAddon);
    terminalRef.current = term;
    term.open(terminalDivRef.current!);
    // Aquí puedes configurar el terminal, por ejemplo, temas, tamaño de fuente, etc.
    // Consulta la documentación de xterm.js para más detalles: https://xtermjs.org/docs/api/terminal/
    term.onData(sendDataShell);

    fitAddon.fit();
    resizePty(term.rows, term.cols);
    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className=" text-white w-full bg-stone-800 h-full flex flex-col justify-end overflow-y-auto overflow-x-hidden ">
      <div className="p-2">
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
        {!created && (
          <button
            onClick={() => {
              createShell()
                .then(() => console.log("Terminal creada  con exito"))
                .finally(() => setCreated(true));
            }}
          >
            <FaPlus></FaPlus>
          </button>
        )}
        <button
          className=""
          onClick={() => {
            killShell().then(() => console.log("Sent kill signal"));
          }}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
      <div className="flex-1 overflow-hidden" ref={ref}>
        <div className="w-full h-full overflow-y-hidden" ref={terminalDivRef} />
      </div>
    </div>
  );
}
