import { FileHierachy } from "./content/FileHierachy";

interface ISideBarContentProps {
  show?: boolean;
}

export function SideBarContent({}: ISideBarContentProps) {
  return (
    <div className="w-full h-full bg-stone-700">
      <FileHierachy />
    </div>
  );
}
