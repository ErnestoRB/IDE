import { useFileStore } from "../../stores/files";
import { useVainillaTheme } from "../../theme";

export function Lexico() {

  const lexicoResult = useFileStore((state) => state.lexicoResult);
  const theme = useVainillaTheme();

  return (
    <div className={`px-4 pt-2 w-full h-full  ${theme.selectedTheme.definition["text"]} grid overflow-y-auto overflow-x-hidden ${theme.selectedTheme.definition["primary-4"]}`}>
    {lexicoResult && lexicoResult[0] && lexicoResult[0].length > 0 ? (
      <table className="table-auto">
        <thead>
          <tr className="border-b border-b-gray-400">
            <th>Tipo de Token</th>
            <th>Lexema</th>
          </tr>
        </thead>
        <tbody className="bo">
          {lexicoResult[0].map((token, index) => (
            <tr
              key={index}
              className="border-b text-center border-b-gray-400"
            >
              <td className="p-2 border-r border-b-gray-400">
                {token.token_type}
              </td>
              <td className="p-2">{token.lexemme}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="grid place-items-center">Nada que mostrar</p>
    )}
  </div>
  );
}
