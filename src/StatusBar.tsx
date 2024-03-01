import { useEditor } from "./stores/editor";

export function StatusBar() {
  const { editor, line, col } = useEditor();
  return (
    <div className="bg-black text-sm h-5 w-full flex items-center text-white select-none">
      {editor && (
        <span className="ml-auto text-white bg-stone-800 px-2 justify-self-end">
          Line: {line}, Col: {col}
        </span>
      )}
      {!editor && <span>Loading...</span>}
    </div>
  );
}
