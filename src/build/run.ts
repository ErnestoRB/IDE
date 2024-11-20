import { useFileStore } from "../stores/files";
import { useLayoutStore } from "../stores/layout";
import { useTerminalStore } from "../stores/terminal";
import { createTerminalItem } from "../terminal/backend";
import { codegenFile } from "./codegen";
import { toast } from "react-toastify";

export async function run() {
  const file = useFileStore.getState().activeFile;
  if (!file) {
    console.error("No open file");
    toast.error("No hay ningun archivo activo");
    return;
  }
  const code = await codegenFile(true);
  if (!code) {
    console.error("No code generated");
    toast.error("No hay ningun código generado para ejecutar");
    return;
  }
  const { path } = file;
  let activeTerminal = useTerminalStore.getState().activeTerminal;
  const terminals = useTerminalStore.getState().terminals;
  if (!activeTerminal) {
    if (terminals.length === 0) {
      console.error(
        "No active terminals and no terminals available. Attempting to create one..."
      );
      const shell = useTerminalStore.getState().shell;
      createTerminalItem(shell!).then((item) => {
        useTerminalStore.getState().setActiveTerminal(item);
        useTerminalStore.getState().setActiveTerminalIndex(0);
        useTerminalStore.getState().appendTerminal(item);
        run();
        item.ttyFunctions
          .listenExit((code) => {
            console.log(`Terminal ${item.ttyId} killed with code ${code}`);
            useTerminalStore.getState().removeTerminal(item.ttyId);
          })
          .then(() => {
            console.log(`Unlistening for exit on terminal ${item.ttyId}`);
          });
      });
      return;
    }
    activeTerminal = terminals[0];
    useTerminalStore.getState().setActiveTerminal(activeTerminal);
    useTerminalStore.getState().setActiveTerminalIndex(0);
  }
  useLayoutStore.getState().terminalPanelRef?.expand(); // Mostrar barra inferior de terminal
  useLayoutStore.getState().setActiveTab(0); // mostrar tab de temrinal
  const shell = activeTerminal.shell;
  console.log(`Running code in shell ${shell}, ttyid: ${activeTerminal.ttyId}`);
  const vmPath = path.replace(/\.[^/.]+$/, ".vm");
  toast.info("Intentando ejecutar el archivo: " + file.name);

  activeTerminal.ttyFunctions.sendDataShell(
    `vainilla-machine run '${vmPath}'\n`
  );
  // activeTerminal.ttyFunctions.sendDataShell("vainilla-machine run\n");
  // activeTerminal.ttyFunctions.sendDataShell(vmPath + "\n");
  // activeTerminal.ttyFunctions.sendDataShell("\x04");

  // if (shell.includes("bash")) {
  // } else if (shell.includes("pwsh")) {
  //   activeTerminal.ttyFunctions.sendDataShell("echo 'Hello world!'\n");
  // }
}
