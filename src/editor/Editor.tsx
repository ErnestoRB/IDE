import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useLayoutStore } from "../stores/layout";
import { useEditor } from "../stores/editor";
import { KeyCode, KeyMod } from "monaco-editor";
import { useFileStore } from "../stores/files";
import { VAINILLA_ID } from "../monaco/vainilla";

export function Editor() {
  const { terminalPanelRef, toggleCommand, lateralPanelRef } = useLayoutStore();
  const { editor, setEditor, setCursor } = useEditor();
  const { activeFile } = useFileStore();

  useEffect(() => {
    if (editor && activeFile) {
      editor.setValue(activeFile.content);
    }
  }, [activeFile, editor]);

  useEffect(() => {
    if (editor && terminalPanelRef) {
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
        toggleCommand();
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
      editor.onDidChangeCursorPosition((e) =>
        setCursor(e.position.lineNumber, e.position.column)
      );
    }
  }, [editor, terminalPanelRef]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (mounted) {
      const listener = () => {
        //@ts-ignore
        editor?.layout?.({});
      };

      window.addEventListener("resize", listener);
      return () => {
        window.removeEventListener("resize", listener);
      };
    }
  }, [mounted]);

  return (
    <>
      {!mounted && (
        <div className="w-full h-full grid place-item bg-white text-black">
          Loading...
        </div>
      )}
      <MonacoEditor
        className="min-h-0 min-w-0"
        defaultLanguage={VAINILLA_ID.id}
        defaultValue="// Example"
        onMount={(editor, monaco) => {
          setEditor(editor);
          setMounted(true);
        }}
      />
    </>
  );
}
