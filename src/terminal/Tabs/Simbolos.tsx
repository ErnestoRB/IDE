import React from "react";
import { useFileStore } from "../../stores/files";

export function Simbolos() {
  const lexicoResult = useFileStore((state) => state.lexicoResult);

  return (
    <div className="p-4 w-full h-full bg-stone-800 text-white grid overflow-y-auto overflow-x-hidden">
      {lexicoResult && lexicoResult[0] && lexicoResult[0].length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tipo de Token</th>
              <th>Lexema</th>
            </tr>
          </thead>
          <tbody>
            {lexicoResult[0].map((token, index) => (
              <tr key={index}>
                <td>{token.token_type}</td>
                <td>{token.lexemme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="grid place-items-center">Nada que mostrar</p>
      )}
      <br/><br/>
    </div>
  );
}