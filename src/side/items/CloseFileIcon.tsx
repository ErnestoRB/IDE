import { closeFile } from "../../menuEvents";
import { RiFileCloseLine } from "react-icons/ri";

export function CloseFileIcon() {
    return (
      <div>
        <button
        className="w-10 h-10 grid place-items-center text-white bg-stone-900 hover:bg-black"
        onClick={() => closeFile()}
        title="Cerrar archivo"
      >
        <RiFileCloseLine size={20}/>
      </button>
      </div>
    );
  }