import { useEffect, useRef, useState } from "react";
import { buildShellFunctions, createShell } from "./backend";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
import { listen } from "@tauri-apps/api/event";
import useResizeObserver from "use-resize-observer";

interface TTY {
  funcs: ReturnType<typeof buildShellFunctions>;
  id: number;
  killed: boolean;
}

export function TerminalComponent({ shell }: { shell: string }) {
  const terminalDivRef = useRef<HTMLDivElement>(null!);
  const fitAddonRef = useRef<FitAddon | undefined>(undefined);
  const terminalRef = useRef<Terminal | undefined>(undefined);
  const ttyObj = useRef<TTY | undefined>(undefined);
  const [created, setCreated] = useState(false);

  const { height, ref, width } = useResizeObserver<HTMLDivElement>();

  const onTerminalKill = (code: number) => {
    console.log("Terminated");
    terminalRef.current?.clear();
    terminalRef.current?.writeln(
      `Terminal terminado con código ${code}, inicia otra terminal`
    );
  };

  useEffect(() => {
    if (width && height) {
      if (fitAddonRef.current) {
        fitAddonRef.current?.fit();
        if (ttyObj.current?.killed) return;
        ttyObj.current?.funcs.resizePty(
          terminalRef.current!.rows,
          terminalRef.current!.cols
        );
      }
    }
  }, [width, height, created]);

  useEffect(() => {
    createShell(shell)
      .then((id) => {
        console.log("TTY creada con exito");
        const funcs = buildShellFunctions(id);
        ttyObj.current = { id, funcs, killed: false };
        terminalRef.current?.clear();
        const ttyListenPromise = listen(`tty-${id}`, (e) =>
          terminalRef.current?.write(e.payload as string)
        );
        const shellExitPromise = listen(`tty-exit-${id}`, (e) => {
          onTerminalKill(e.payload as number);
          ttyObj.current!.killed = true;
          ttyListenPromise.then((u) => {
            console.log("Doing tty cleanup");
            u();
          });
          shellExitPromise.then((u) => {
            console.log("Doing tty cleanup");
            u();
          });
        });
        setCreated(true);
        console.log("Creando xterm");
        const term = new Terminal({ cols: 80, rows: 24 }); // crear xterm
        const fitAddon = new FitAddon();
        fitAddonRef.current = fitAddon;
        term.loadAddon(fitAddon);
        terminalRef.current = term;
        term.open(terminalDivRef.current!);
        // Aquí puedes configurar el terminal, por ejemplo, temas, tamaño de fuente, etc.
        // Consulta la documentación de xterm.js para más detalles: https://xtermjs.org/docs/api/terminal/
        term.onData((data) => {
          if (ttyObj.current?.killed) return;
          funcs.sendDataShell(data);
        });
        fitAddon.fit();
        funcs.resizePty(term.rows, term.cols);
        return () => {
          term.dispose();
          if (!ttyObj.current?.killed) {
            funcs.killShell().then(() => {
              ttyListenPromise.then((u) => {
                console.log("Doing tty cleanup (unmounted)");
                u();
              });
              shellExitPromise.then((u) => {
                console.log("Doing tty cleanup (unmounted)");
                u();
              });
            });
          }
        };
      })
      .catch((e) => console.log(`Shell no pudo ser creada: ${e}`));
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="flex-1 w-full h-full overflow-hidden" ref={ref}>
      <div className="w-full h-full overflow-y-hidden" ref={terminalDivRef} />
    </div>
  );
}
