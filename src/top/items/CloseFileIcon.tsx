import { closeFile } from "../../menuEvents";
import { RiFileCloseLine } from "react-icons/ri";
import { TopBarButton } from "../TopBarButton";

export function CloseFileIcon() {
  return (
    <TopBarButton
      title="Cerrar archivo"
      onClick={() => closeFile()}
      icon={<RiFileCloseLine size={20} />}
    ></TopBarButton>
  );
}
