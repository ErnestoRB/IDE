import { OpenIcon } from "./items/OpenIcon";
import { SaveIcon } from "./items/SaveIcon";
import { SaveAsIcon } from "./items/SaveAsIcon";
import { CloseFileIcon } from "./items/CloseFileIcon";
import { CompilerButton } from "./items/CompilerButton";
import ChangeTheme from "./items/ChangeTheme";

export function NavBar() {
  return (
    <div
      className="flex bg-stone-900">
      <OpenIcon></OpenIcon>
      <CloseFileIcon></CloseFileIcon>
      <SaveIcon></SaveIcon>
      <SaveAsIcon></SaveAsIcon>
      <CompilerButton></CompilerButton>
      <ChangeTheme></ChangeTheme>
    </div>
  );
}
