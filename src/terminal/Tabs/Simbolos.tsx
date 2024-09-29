import { useFileStore } from "../../stores/files";

export function Simbolos() {
  const result = useFileStore((f) => f.semanticoResult);

  return (
    <div className="w-full h-full bg-stone-700 text-white grid">
      <div className="w-full grid grid-cols-4">
        <div className="bg-stone-900">Nombre</div>
        <div className="bg-stone-900">Definicion</div>
        <div className="bg-stone-900">Ubicacion en memoria</div>
        <div className="bg-stone-900">Usos</div>
        {result &&
          Object.entries(result[0]).map(([name, data]) => {
            return (
              <>
                <div>{name}</div>
                <div>
                  Linea {data.declaration.lin}, Columna {data.declaration.col}
                </div>
                <div>{data.mem_location}</div>
                <div>
                  {data.usages
                    .map((u) => `(${u.cursor.lin}, ${u.cursor.col})`, "")
                    .join("  | ")}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
