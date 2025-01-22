import { useFileStore } from "../../stores/files";
import { FileItem } from "./FileItem";
import { openEditorFile } from "../../menuEvents";
import { useVainillaTheme } from "../../theme";

export interface IFileItem {
  name: string;
  path: string;
}

export function FileHierachy() {
  const folder = useFileStore((s) => s.folder);
  const files = useFileStore((s) => s.files);
  const activeFile = useFileStore((s) => s.activeFile);
  const setActiveFile = useFileStore((s) => s.setActiveFile);
  const theme = useVainillaTheme();

  return (
    <div className="w-full h-full">
      <div
        className={`px-2 flex items-center text-sm h-6 w-full ${theme.selectedTheme.definition.sidebarPanelHeader}`}
      >
        <p> {folder ? folder.split("/").pop() : "Archivos"}</p>
      </div>
      <div
        className="w-full flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {files.map((f) => (
          <FileItem
            active={f.path === activeFile?.path}
            onClick={() => {
              setActiveFile(f.path);
            }}
            key={f.path}
            file={f}
          ></FileItem>
        ))}
        {!files ||
          (files.length == 0 && (
            <div
              className={`flex flex-col text-xs ${theme.selectedTheme.definition["text"]} text-center p-2 gap-y-1 ${theme.selectedTheme.definition.openFileButton}`}
            >
              <span>Aún no has abierto ningún archivo!</span>
              <button className=" px-4 py-2" onClick={() => openEditorFile()}>
                Abrir archivo
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
