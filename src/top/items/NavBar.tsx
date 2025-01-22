import { OpenIcon } from "./OpenIcon";
import { SaveIcon } from "./SaveIcon";
import { SaveAsIcon } from "./SaveAsIcon";
import { CloseFileIcon } from "./CloseFileIcon";
import { CompilerButton } from "./CompilerButton";
import ChangeTheme from "./ChangeTheme";
import { OpenFolderIcon } from "./OpenFolderIcon";
import { useVainillaTheme } from "../../theme";
import { ThemeButton } from "./ThemeButton";

export function NavBar() {
  const theme = useVainillaTheme();

  return (
    <div className={`flex ${theme.selectedTheme.definition.topBar}`}>
      <OpenFolderIcon></OpenFolderIcon>
      <OpenIcon></OpenIcon>
      <CloseFileIcon></CloseFileIcon>
      <SaveIcon></SaveIcon>
      <SaveAsIcon></SaveAsIcon>
      <CompilerButton></CompilerButton>
      <ChangeTheme></ChangeTheme>
      <div className="flex-1 flex justify-end">
        <ThemeButton />
      </div>
    </div>
  );
}
