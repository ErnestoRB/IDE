import { useRef } from "react";
import { useVainillaTheme } from "../theme";

export function CommandPanel() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const theme = useVainillaTheme();
  const results = [];

  return (
    <div
      className={`rounded-md text-sm pt-1 pb-2 px-4 flex flex-col w-full min-w-64 max-w-md ${theme.selectedTheme.definition["primary-4"]}  ${theme.selectedTheme.definition["text"]}`}
    >
      <span className="w-full">Comandos</span>
      <div className="flex">
        <input
          ref={inputRef}
          type="text"
          className={`w-full px-2 py-1 focus:outline-none ${theme.selectedTheme.definition["primary-2"]}`}
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
