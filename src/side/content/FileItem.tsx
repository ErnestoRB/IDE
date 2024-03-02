import { GoFileCode } from "react-icons/go";
import { IFileItem } from "./FileHierachy";

export interface IFileItemProps {
  file: IFileItem;
}
export function FileItem({ file: { name } }: IFileItemProps) {
  return (
    <div className="overflow-clip px-2 text-sm text-white w-full bg-stone-800 hover:bg-stone-900 flex items-center gap-2">
      <GoFileCode className="min-w-fit"></GoFileCode> {name}
    </div>
  );
}
