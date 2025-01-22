import { useEditor } from "./stores/editor";
import { useVainillaTheme } from "./theme";

export function StatusBar() {
  const { editor, line, col } = useEditor();
  const theme = useVainillaTheme();
    return (  
  
    <div className={` text-sm h-5 w-full flex items-center  select-none ${theme.selectedTheme.definition.statusBar}`}>
      {editor && (
        <span className={`ml-auto px-2 justify-self-end ${theme.selectedTheme.definition.lineBar}`}>
          Line: {line}, Col: {col}
        </span>
      )}
      {!editor && <span>Loading...</span>}
    </div>
  );
}
