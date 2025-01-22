import { GoFileCode } from "react-icons/go";
import { IFileItem } from "./FileHierachy";
import { useVainillaTheme } from "../../theme";

export interface IFileItemProps {
  file: IFileItem;
  onClick?: () => void;
  active?: boolean;
}
export function FileItem({
  file: { name, path },
  onClick,
  active,
}: IFileItemProps) {
  const theme = useVainillaTheme();

  return (
    <div
      onClick={onClick}
      title={path}
      role="button"
      className={`overflow-clip px-2 text-sm w-full flex items-center gap-2 ${
        active ? theme.selectedTheme.definition.fileItem__active : ""
      } ${theme.selectedTheme.definition.fileItem}`}
    >
      <GoFileCode className="min-w-fit"></GoFileCode>{" "}
      <span className="flex-1" title={path}>
        {name}
      </span>
      {/* <div className="">
        <span
          title=""
          className="block text-xs text-stone-300 text-ellipsis"
        ></span>
      </div> */}
    </div>
  );
}
