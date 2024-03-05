import { openEditorFile } from "../../menuEvents";
import { MdOutlineFileOpen } from "react-icons/md";

export function OpenIcon() {
    return (
      <div>
        <button
        className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black"
        onClick={() => openEditorFile()}
        title="Abrir archivo"
      >
        <MdOutlineFileOpen size={20}/>
      </button>
      </div>
    );
  }