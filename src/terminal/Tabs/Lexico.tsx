import { useFileStore } from "../../stores/files";

export function Lexico() {

  const lexicoResult = useFileStore((state) => state.lexicoResult);

  return (
    <div className="px-4 pt-2 w-full h-full bg-stone-900 text-white grid overflow-y-auto overflow-x-hidden">
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
