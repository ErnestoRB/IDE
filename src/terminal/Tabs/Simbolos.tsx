import { useFileStore } from "../../stores/files";
import { useVainillaTheme } from "../../theme";

export function Simbolos() {
  const result = useFileStore((f) => f.semanticoResult);
  const theme = useVainillaTheme();

  return (
    <div
      className={`w-full grid text-center ${theme.selectedTheme.definition["primary-2"]} ${theme.selectedTheme.definition["text"]}`}
    >
      <div className="w-full grid grid-cols-6 ">
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Nombre
        </div>
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Tipo
        </div>
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Valor
        </div>
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Definicion
        </div>
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Ubicacion en memoria
        </div>
        <div
          className={`${theme.selectedTheme.definition["primary-5"]} border`}
        >
          Lineas de Uso
        </div>
      </div>
      {result &&
        Object.entries(result[0]).map(([name, data]) => {
          const value =
            data.value == null
              ? "No establecido"
              : typeof Object.values(data.value)[0] === "number"
              ? parseFloat(Object.values(data.value)[0].toFixed(2))
              : Object.values(data.value)[0];

          return (
            <div
              key={name}
              className={`w-full ${theme.selectedTheme.definition["primary-1"]} h-full grid grid-cols-6 `}
            >
              <div className="border">{name}</div>
              <div className="border">{data.typ}</div>
              <div className="border">{value}</div>
              <div className="border">Linea {data.declaration.lin}</div>
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
