import { saveEditorFile } from "../../menuEvents";
import { IoSaveOutline } from "react-icons/io5";
import { TopBarButton } from "../TopBarButton";

export function SaveIcon() {
  return (
    <TopBarButton
      title="Guardar cambios"
      onClick={() => saveEditorFile()}
      icon={<IoSaveOutline size={20} />}
    ></TopBarButton>
  );
}
