import { useVainillaTheme } from "../theme";
import { FileHierachy } from "./content/FileHierachy";

interface ISideBarContentProps {
  show?: boolean;
}

export function SideBarContent({}: ISideBarContentProps) {
   const theme = useVainillaTheme();
  return (
    <div className={`w-full h-full ${theme.selectedTheme.definition.sidebarPanel}`}>
      <FileHierachy />
    </div>
  );
}
