import { useFileStore } from "../../../stores/files";
import { TreeNode } from "./TreeNode";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

export function Sintactico() {
  const sintacticoResult = useFileStore((state) => state.sintacticoResult);
  const sintacticoError = useFileStore((state) => state.sintacticoError);

  if (sintacticoError) {
    return <div>Error de parsing</div>;
  }

  return (
    <SimpleTreeView>
      <TreeNode node={sintacticoResult}></TreeNode>
    </SimpleTreeView>
  );
}
