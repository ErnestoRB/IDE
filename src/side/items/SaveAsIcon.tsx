import { saveEditorFileAs } from "../../menuEvents";
import { MdOutlineSaveAs } from "react-icons/md";

export function SaveAsIcon() {
    return (
      <div>
        <button
        className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black"
        onClick={() => saveEditorFileAs()}
        title="Guardar como"
      >
        <MdOutlineSaveAs size={20}/>
      </button>
      </div>
    );
  }