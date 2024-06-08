import { useFileStore } from "../../../stores/files";
import { TreeNode } from "./TreeNode";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

export function Sintactico() {
  const sintacticoResult = useFileStore((state) => state.sintacticoResult);
  /* 
  if (sintacticoResult[1].Parse.length > 0) {
    return <div>Error de parsing</div>;
  } */

  if (!sintacticoResult[0]) {
    return <div>No se formó ningun arbol sintáctico</div>;
  }

  return (
    <SimpleTreeView>
      <TreeNode node={sintacticoResult[0]}></TreeNode>
    </SimpleTreeView>
  );
}
