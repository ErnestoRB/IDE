import { saveEditorFileAs } from "../../menuEvents";
import { MdOutlineSaveAs } from "react-icons/md";
import { TopBarButton } from "../TopBarButton";

export function SaveAsIcon() {
  return (
    <TopBarButton
      title="Guardar como"
      onClick={() => saveEditorFileAs()}
      icon={<MdOutlineSaveAs size={20} />}
    ></TopBarButton>
  );
}
