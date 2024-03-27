import { KeyCode, KeyMod } from "monaco-editor";
import monaco from "monaco-editor";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useLayoutStore } from "../stores/layout";
import { CommandPanel } from "../commands/CommandPanel";

export const setupEditorCommands = (
  editor: monaco.editor.IStandaloneCodeEditor,
  terminalPanelRef: ImperativePanelHandle,
  lateralPanelRef: ImperativePanelHandle
) => {
  editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyJ, () => {
    if (terminalPanelRef) {
      if (terminalPanelRef.isCollapsed()) {
        terminalPanelRef.expand();
      } else {
        terminalPanelRef.collapse();
      }
    }
  });
  editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyP, () => {
    useLayoutStore.setState({
      isModalOpen: !useLayoutStore.getState().isModalOpen,
      modalContent: <CommandPanel />,
    });
  });
  editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyB, () => {
    if (lateralPanelRef) {
      if (lateralPanelRef.isCollapsed()) {
        lateralPanelRef.expand();
      } else {
        lateralPanelRef.collapse();
      }
    }
  });
};
