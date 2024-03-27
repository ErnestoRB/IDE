import { useRef } from "react";

export function CommandPanel() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const results = [];

  return (
    <div className="text-white text-sm pt-1 pb-2 px-4 flex flex-col w-full min-w-64 max-w-md bg-stone-800">
      <span className="w-full">Commands</span>
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          className="bg-stone-600 w-full text-white px-2 py-1 focus:outline-none"
        ></input>
      </div>
      <div className="flex flex-col pt-2 text-sm">
        {results.length == 0 && (
          <span className="text-center">No hay coincidencias</span>
        )}
      </div>
    </div>
  );
}
