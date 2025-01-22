import { GoFile, GoX } from "react-icons/go";
import { useFileStore } from "../stores/files";
import { useVainillaTheme } from "../theme";

export function OpenFiles() {
  const activeFile = useFileStore((s) => s.activeFile);
  const closeFile = useFileStore((s) => s.closeFile);
  const theme = useVainillaTheme();

  const hasChanges = activeFile?.originalContent !== activeFile?.content;

  return (
    <header className={`${theme.selectedTheme.definition.openFileHeader}`}>
      <div className={`flex flex-row items-center gap-x-1   w-32  px-2 py-1 ${theme.selectedTheme.definition.openFile} ${theme.selectedTheme.definition["text"]}`} >
        <GoFile></GoFile>
        <span className="text-xs flex-1">
          {activeFile ? activeFile.name : "Nuevo archivo"} {hasChanges && "*"}
        </span>
        {activeFile && (
          <GoX
            className="hover:opacity-80"
            onClick={() => {
              closeFile();
            }}
          ></GoX>
        )}
      </div>
    </header>
  );
}
