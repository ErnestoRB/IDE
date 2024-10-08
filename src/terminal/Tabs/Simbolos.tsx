import { useFileStore } from "../../stores/files";

export function Simbolos() {
  const result = useFileStore((f) => f.semanticoResult);

  return (
    <div className="w-full h-full bg-stone-700 text-white grid text-center">
      <div className="w-full grid grid-cols-6 border border-white">
        <div className="bg-stone-900 border">Nombre</div>
        <div className="bg-stone-900 border">Tipo</div>
        <div className="bg-stone-900 border">Valor</div>
        <div className="bg-stone-900 border">Definicion</div>
        <div className="bg-stone-900 border">
          Ubicacion en memoria
        </div>
        <div className="bg-stone-900 border border-white">Lineas de Uso</div>
      </div>
      {result &&
        Object.entries(result[0]).map(([name, data]) => {
          return (
            <div
              key={name}
              className="w-full bg-stone-700 h-full grid grid-cols-6 border"
            >
              <div className="border">{name}</div>
              <div className="border">{data.typ}</div>
              <div className="border">
                {data.value == null
                  ? "No establecido"
                  : Object.values(data.value)[0]}
              </div>
              <div className="border">
                Linea {data.declaration.lin}
              </div>
              <div className="border">{data.mem_location}</div>
              <div className="border">
                {data.usages.map((u) => `${u.cursor.lin}`, "").join("  | ")}
              </div>
            </div>
          );
        })}
    </div>
  );
}
