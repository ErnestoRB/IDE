import { GoFileCode } from "react-icons/go";
import { IFileItem } from "./FileHierachy";

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
  return (
    <div
      onClick={onClick}
      title={path}
      role="button"
      className={`overflow-clip px-2 text-sm text-white w-full bg-stone-800 hover:bg-stone-900 flex items-center gap-2 ${
        active ? "bg-stone-900" : ""
      }`}
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
