import React from "react";
import { useFileStore } from "../../stores/files";

export function Errores() {
  const lexicoResult = useFileStore((state) => state.lexicoResult);

  return (
    <div className="p-4 w-full h-full bg-stone-800 text-white grid overflow-y-auto overflow-x-hidden">
      {lexicoResult && lexicoResult[1] && lexicoResult[1].length > 0 ? (
        <div>
          {lexicoResult[1].map((error, index) => (
              <div key={index} className="text-red-400">
                <p>Error en el lexema '{error.lexemme}'</p>
                <p>{error.message}</p>
                <p>En linea {error.position.lin}, columna {error.position.col}</p>
                <br/>
              </div>
            ))}
        </div>
      ) : (
        <p className="grid place-items-center">Nada que mostrar</p>
      )}
      <br/><br/>
    </div>
  );
}
