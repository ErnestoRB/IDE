import { Editor as MonacoEditor } from "@monaco-editor/react";

import { useFileStore } from "../../stores/files";
import { useEditor } from "../../stores/editor";
import { useVainillaTheme } from "../../theme";

export function Intermedio() {
  const generatedCode = useFileStore((s) => s.generatedCode);
  const theme = useEditor((s) => s.theme);
  const vtheme = useVainillaTheme();

  return (
    <div className={`w-full h-full ${vtheme.selectedTheme.definition["text"]} grid place-items-center ${vtheme.selectedTheme.definition["primary-4"]}`}>
      {/* <div className="flex flex-col overflow-auto w-full h-full">
        {generatedCode ? (
          generatedCode.split("\n").map((line, i) => (
            <div key={i}>
              <span className="w-6">
                {i + 1}
                {". "}
              </span>
              <span className="flex-1">{line}</span>
            </div>
          ))
        ) : (
          <div className="text-center">Sin código intermedio disponible</div>
        )}
      </div> */}
      {generatedCode ? (
        <MonacoEditor
          language="plain/text"
          className="z-50"
          theme={theme}
          value={generatedCode}
          options={{
            readOnly: true,
            readOnlyMessage: {
              value: "Este código fue generado y no debe editarse",
            },
          }}
        ></MonacoEditor>
      ) : (
        <div className="text-center">Sin código intermedio disponible</div>
      )}
    </div>
  );
}
