import { useFileStore } from "../../stores/files";

export function Errores() {
  const lexicoResult = useFileStore((state) => state.lexicoResult);

  return (
    <div className="px-4 pt-2 w-full h-full bg-stone-900 text-white grid overflow-y-auto overflow-x-hidden text-sm">
      {lexicoResult && lexicoResult[1] && lexicoResult[1].length > 0 ? (
        <div>
          {lexicoResult[1].map((error, index) => (
            <div key={index} className="text-red-400">
              <p>Error en el lexema '{error.lexemme}'</p>
              <p>{error.message}</p>
              <p>
                En linea {error.position.lin}, columna {error.position.col}
              </p>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p className="grid place-items-center">Nada que mostrar</p>
      )}
    </div>
  );
}
