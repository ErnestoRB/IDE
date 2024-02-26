import { IconContext } from "react-icons";
import { SidebarFile } from "./items/SidebarFile";

export function SideBar() {
  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="flex flex-col w-14 bg-stone-800 h-full">
        <SidebarFile></SidebarFile>
      </div>
    </IconContext.Provider>
  );
}
