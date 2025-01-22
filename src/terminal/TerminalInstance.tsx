import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
import useResizeObserver from "use-resize-observer";
import { ShellFunctions } from "../stores/terminal";

interface TTY {
  killed: boolean;
}

interface TerminalComponentProps {
  ttyId: number;
  funcs: ShellFunctions;
  onKill?: () => void;
}

export function TerminalComponent({
  // ttyId: id,
  funcs,
}: // onKill,
TerminalComponentProps) {
  const terminalDivRef = useRef<HTMLDivElement>(null!);
  const fitAddonRef = useRef<FitAddon | undefined>(undefined);
  const terminalRef = useRef<Terminal | undefined>(undefined);
  const ttyObj = useRef<TTY | undefined>(undefined);
  const [created, setCreated] = useState(false);

  const { height, ref, width } = useResizeObserver<HTMLDivElement>();

  const onTerminalKill = (code: number) => {
    terminalRef.current?.clear();
    terminalRef.current?.writeln(
      `Terminal terminado con código ${code}, inicia otra terminal`
    );
    // onKill?.();
  };

  useEffect(() => {
    if (width && height) {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
        if (ttyObj.current?.killed) return;
        funcs.resizePty(terminalRef.current!.rows, terminalRef.current!.cols);
      }
    }
  }, [width, height, created]);

  useEffect(() => {
    // console.log("TTY creada con exito");
    ttyObj.current = { killed: false };
    terminalRef.current?.clear();
    const ttyListenPromise = funcs.listenTty((e) =>
      terminalRef.current?.write(e.toString())
    );
    const shellExitPromise = funcs.listenExit((e) => {
      onTerminalKill(e);
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
        // funcs.killShell().then(() => {
        ttyListenPromise.then((u) => {
          console.log("Doing tty cleanup (unmounted)");
          u();
        });
        shellExitPromise.then((u) => {
          console.log("Doing tty cleanup (unmounted)");
          u();
        });
        // });
      }
    };
  }, []);

  return (
    <div className="flex-1 w-full h-full overflow-hidden" ref={ref}>
      <div
        className="bg-black w-full h-full overflow-y-hidden p-0 m-0"
        ref={terminalDivRef}
      />
    </div>
  );
}
