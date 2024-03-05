import { saveEditorFile } from "../../menuEvents";
import { IoSaveOutline } from "react-icons/io5";

export function SaveIcon() {
    return (
      <div>
        <button
        className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black"
        onClick={() => saveEditorFile()}
        title="Guardar cambios"
      >
        <IoSaveOutline size={20}/>
      </button>
      </div>
    );
  }