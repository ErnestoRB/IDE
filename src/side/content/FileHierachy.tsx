import { FileItem } from "./FileItem";

export interface IFileItem {
  name: string;
  path: string;
}

const files: IFileItem[] = [
  {
    name: "index.cat",
    path: "/home/Users/index.cat",
  },
];

export function FileHierachy() {
  return (
    <div className="w-full h-full">
      <div className="px-2 text-white flex items-center text-sm h-6 w-full bg-stone-950">
        <p>Archivos</p>
      </div>
      <div className="w-full flex flex-col">
        {files.map((f) => (
          <FileItem key={f.path} file={f}></FileItem>
        ))}
      </div>
    </div>
  );
}
