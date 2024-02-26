import { GoFile } from "react-icons/go";
import { SideBarItem } from "../SideBarItem";
import { useLayoutStore } from "../../stores/layout";

export function SidebarFile() {
  const toggleLateral = useLayoutStore((s) => s.toggleLateral);

  return (
    <SideBarItem icon={GoFile} onClick={() => toggleLateral()}></SideBarItem>
  );
}
