import { useFileStore } from "../stores/files";
import { useLayoutStore } from "../stores/layout";
import { useTerminalStore } from "../stores/terminal";

export function run() {
  const code = useFileStore.getState().generatedCode;
  if (!code) {
    console.error("No code to run");
    return;
  }
  let activeTerminal = useTerminalStore.getState().activeTerminal;
  const terminals = useTerminalStore.getState().terminals;
  if (!activeTerminal) {
    if (terminals.length === 0) {
      console.error("No active terminals and no terminals available");
      return;
    }
    activeTerminal = terminals[0];
    useTerminalStore.getState().setActiveTerminal(activeTerminal);
    useTerminalStore.getState().setActiveTerminalIndex(0);
  }
  useLayoutStore.getState().terminalPanelRef?.expand(); // Mostrar barra inferior de terminal
  useLayoutStore.getState().setActiveTab(0); // mostrar tab de temrinal
  const shell = activeTerminal.shell;
  console.log("Running code in shell", shell);
  activeTerminal.ttyFunctions.sendDataShell("vainilla-machine run-stdin\n");
  activeTerminal.ttyFunctions.sendDataShell(code + "\n");
  activeTerminal.ttyFunctions.sendDataShell("\x04");

  // if (shell.includes("bash")) {
  // } else if (shell.includes("pwsh")) {
  //   activeTerminal.ttyFunctions.sendDataShell("echo 'Hello world!'\n");
  // }
}
