import { openEditorFile, openFolder } from "../../menuEvents";
import { MdFolder, MdOutlineFileOpen } from "react-icons/md";

export function OpenFolderIcon() {
  return (
    <div>
      <button
        className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black"
        onClick={() => openFolder()}
        title="Abrir archivo"
      >
        <MdFolder size={20} />
      </button>
    </div>
  );
}
