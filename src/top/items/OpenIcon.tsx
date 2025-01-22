import { openEditorFile } from "../../menuEvents";
import { MdOutlineFileOpen } from "react-icons/md";
import { TopBarButton } from "../TopBarButton";

export function OpenIcon() {
  return (
    <TopBarButton
      title="Abrir archivo"
      onClick={() => openEditorFile()}
      icon={<MdOutlineFileOpen size={20} />}
    ></TopBarButton>
  );
}
