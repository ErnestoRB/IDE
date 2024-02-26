import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export function Editor() {
  const editorRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (mounted) {
      console.log(editorRef.current);

      const listener = () => {
        editorRef.current.layout?.({});
      };

      window.addEventListener("resize", listener);
      return () => {
        window.removeEventListener("resize", listener);
      };
    }
  }, [mounted]);

  return (
    <MonacoEditor
      options={{ automaticLayout: true }}
      className="min-h-0 min-w-0"
      defaultLanguage="javascript"
      defaultValue="// sasd comment"
      onMount={(editor, monaco) => {
        editorRef.current = editor;
        console.log({ editor });
        setMounted(true);
      }}
    />
  );
}
