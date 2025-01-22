import { IconContext } from "react-icons";
import { SidebarFile } from "./SidebarFile";
import { useVainillaTheme } from "../theme";

export function SideBar() {
  const theme = useVainillaTheme();
  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className={`flex flex-col w-14 h-full ${theme.selectedTheme.definition.sidebar}`}>
        <SidebarFile></SidebarFile>
      </div>
    </IconContext.Provider>
  );
}
