import { useLayoutStore } from "../stores/layout";
import { useTerminalStore } from "../stores/terminal";

export function run() {
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
  activeTerminal.ttyFunctions.sendDataShell("echo 'Hello world!'\n");
}
