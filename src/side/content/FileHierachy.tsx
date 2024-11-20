import { useFileStore } from "../../stores/files";
import { FileItem } from "./FileItem";
import { openEditorFile } from "../../menuEvents";

export interface IFileItem {
  name: string;
  path: string;
}

export function FileHierachy() {
  const folder = useFileStore((s) => s.folder);
  const files = useFileStore((s) => s.files);
  const activeFile = useFileStore((s) => s.activeFile);
  const setActiveFile = useFileStore((s) => s.setActiveFile);

  return (
    <div className="w-full h-full">
      <div className="px-2 text-white flex items-center text-sm h-6 w-full bg-stone-950">
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
            <div className=" flex flex-col text-xs text-white text-center p-2 gap-y-1">
              <span>Aún no has abierto ningún archivo!</span>
              <button
                className="bg-black active:bg-stone-900 hover:bg-stone-950 px-4 py-2"
                onClick={() => openEditorFile()}
              >
                Abrir archivo
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
