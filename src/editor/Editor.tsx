import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useLayoutStore } from "../stores/layout";
import { useEditor } from "../stores/editor";
import { useFileStore } from "../stores/files";
import { VAINILLA_ID } from "../monaco/vainilla";
import { scanFile } from "../build/scan";
import { setupEditorCommands } from "./setup";

export function Editor() {
  const { terminalPanelRef, lateralPanelRef } = useLayoutStore();
  const { editor, setEditor, setCursor } = useEditor();
  const { activeFile } = useFileStore();
  const setLexicoResult = useFileStore((s) => s.setLexicoResult);

  const theme = useEditor((s) => s.theme);
  const monaco = useMonaco();

  useEffect(() => {
    if (editor && activeFile) {
      editor.setValue(activeFile.content);
    }
  }, [activeFile, editor]);

  useEffect(() => {
    if (!editor) return;
    editor.onDidChangeCursorPosition((e) =>
      setCursor(e.position.lineNumber, e.position.column)
    );
  }, [editor]);

  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(theme);
    }
  }, [monaco, theme]);

  useEffect(() => {
    if (editor && terminalPanelRef && lateralPanelRef) {
      setupEditorCommands(editor, terminalPanelRef, lateralPanelRef);
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
        theme={theme}
        onMount={(editor) => {
          setEditor(editor);
          setMounted(true);
        }}
        options={{}}
        onChange={(str) => {
          if (!str || !editor || !monaco) return;
          scanFile(str).then((v) => {
            setLexicoResult(v);
            monaco.editor.setModelMarkers(
              editor.getModel()!,
              "",
              v[1].map((v) => ({
                endColumn: v.end.col,
                startColumn: v.start.col,
                startLineNumber: v.start.lin,
                endLineNumber: v.end.lin,
                message: v.message,
                severity: monaco.MarkerSeverity.Error,
              }))
            );
          });
        }}
      />
    </>
  );
}
