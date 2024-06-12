import { useFileStore } from "../../stores/files";

export function Errores() {
  const lexicoResult = useFileStore((state) => state.lexicoResult);
  const sintacticoResult = useFileStore((state) => state.sintacticoResult);

  return (
    <div className="px-4 pt-2 w-full h-full bg-stone-900 text-white grid overflow-y-auto overflow-x-hidden text-sm">
      {lexicoResult && lexicoResult[1] && lexicoResult[1].length > 0 && (
        <div>
          {lexicoResult[1].map((error, index) => (
            <div key={index} className="text-red-400">
              <p>
                Error en el lexema '{error.lexemme}': {error.message}
              </p>
              <p>
                En linea {error.start.lin}, columna {error.start.col}
              </p>
              <br />
            </div>
          ))}
        </div>
      )}
      {sintacticoResult &&
        sintacticoResult[1] &&
        sintacticoResult[1].Parse &&
        sintacticoResult[1].Parse.length > 0 && (
          <div>
            {sintacticoResult[1].Parse.map((error, index) => (
              <div key={index} className="text-red-400">
                <p>
                  Error sintactico: {error.message}{" "}
                  {error.current_token
                    ? `En el token: ${error.current_token}`
                    : ``}
                </p>
                <br />
              </div>
            ))}
          </div>
        )}
      {lexicoResult &&
        lexicoResult[1] &&
        lexicoResult[1].length == 0 &&
        sintacticoResult &&
        sintacticoResult[1] &&
        sintacticoResult[1].Parse?.length == 0 && (
          <p className="grid place-items-center">Nada que mostrar</p>
        )}
    </div>
  );
}
