import { useEffect, useRef } from "react";
import { useLayoutStore } from "../stores/layout";

export function CommandPanel() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { commandPanel } = useLayoutStore();

  useEffect(() => {
    if (commandPanel) {
      inputRef.current.focus();
    }
  }, [commandPanel]);

  return (
    <div
      className="text-white text-sm pt-1 pb-2 px-4 flex flex-col fixed  w-full min-w-64 max-w-md bg-stone-800 top-0 left-1/2 z-10 -translate-x-1/2"
      style={{ display: commandPanel ? "flex" : "none" }}
    >
      <span className="w-full">Commands</span>
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          className="bg-stone-600 w-full text-white focus:border-white"
        ></input>
      </div>
      <div></div>
    </div>
  );
}
