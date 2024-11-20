import { GoFile, GoX } from "react-icons/go";
import { useFileStore } from "../stores/files";

export function OpenFiles() {
  const activeFile = useFileStore((s) => s.activeFile);
  const closeFile = useFileStore((s) => s.closeFile);

  const hasChanges = activeFile?.originalContent !== activeFile?.content;

  return (
    <div className="flex flex-row items-center gap-x-1 text-white w-32 bg-stone-900 px-2 py-1">
      <GoFile></GoFile>
      <span className="text-xs flex-1">
        {activeFile ? activeFile.name : "Nuevo archivo"} {hasChanges && "*"}
      </span>
      {activeFile && (
        <GoX
          className="hover:text-stone-400"
          onClick={() => {
            closeFile();
          }}
        ></GoX>
      )}
    </div>
  );
}
