import { openFolder } from "../../menuEvents";
import { MdFolder } from "react-icons/md";
import { TopBarButton } from "../TopBarButton";

export function OpenFolderIcon() {
  return (
    <TopBarButton
      title="Abrir archivo"
      onClick={() => {
        openFolder();
      }}
      icon={<MdFolder size={20} />}
    ></TopBarButton>
  );
}
