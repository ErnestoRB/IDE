import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { BiSolidCheckboxMinus } from "react-icons/bi";
import { MdOutlineExpand } from "react-icons/md";
import { TreeNode } from "./Sintactico/TreeNode";
import { useFileStore } from "../../stores/files";
import { TreeNode as ITreeNode, Node } from "../../build/parse";
import { useVainillaTheme } from "../../theme";
export function Semantico() {
  const semanticoResult = useFileStore((state) => state.semanticoResult);
  const [treeIds, setTreeIds] = useState<string[]>([]);
  const [expandedItems, setExpanded] = useState<string[]>([]);
  const theme = useVainillaTheme();

  useEffect(() => {
    if (semanticoResult && semanticoResult[2]) {
      const arbol: ITreeNode = JSON.parse(JSON.stringify(semanticoResult[2]));
      const ids: string[] = [];
      function getNodeIds(node: Node) {
        if (!node) return;
        if ("Stmt" in node) {
          const id = node.Stmt.id;
          ids.push(id);
          if ("If" in node.Stmt.kind) {
            ids.push(`${id}-0`); // contenedor
            getTreeNodeIds(node.Stmt.kind.If.condition);
            ids.push(`${id}-1`);
            getTreeNodeIds(node.Stmt.kind.If.else_branch!);
            ids.push(`${id}-2`);
            getTreeNodeIds(node.Stmt.kind.If.then_branch!);
          } else if ("While" in node.Stmt.kind) {
            ids.push(`${id}-0`); // contenedor
            getTreeNodeIds(node.Stmt.kind.While.condition);
            ids.push(`${id}-1`); // contenedor
            getTreeNodeIds(node.Stmt.kind.While.body!);
          } else if ("Do" in node.Stmt.kind) {
            ids.push(`${id}-0`); // contenedor
            getTreeNodeIds(node.Stmt.kind.Do.condition);
            ids.push(`${id}-1`); // contenedor
            getTreeNodeIds(node.Stmt.kind.Do.body!);
          } else if ("Assign" in node.Stmt.kind) {
            getTreeNodeIds(node.Stmt.kind.Assign.value);
          } else if ("Out" in node.Stmt.kind) {
            getNodeIds(node.Stmt.kind.Out.expression);
          }
        }
        if ("Exp" in node) {
          const id = node.Exp.id;
          ids.push(id);
          if ("Op" in node.Exp.kind) {
            getNodeIds(node.Exp.kind.Op.left);
            getNodeIds(node.Exp.kind.Op.right);
          }
        }
        if ("Decl" in node) {
          ids.push(node.Decl.id);
        }
      }
      function getTreeNodeIds(node: ITreeNode) {
        if (!node) return;
        if (node.sibling) {
          getTreeNodeIds(node.sibling);
        }
        if (node.node) {
          return getNodeIds(node.node);
        }
      }
      getTreeNodeIds(arbol); // empezar recursividad
      setTreeIds(ids);
    }
  }, [semanticoResult]);

  return (
    <div className={`flex flex-col ${theme.selectedTheme.definition["text"]}`}>
      <div className="flex bg-black px-2 gap-2">
        <button
          className="flex justify-center items-center"
          onClick={() => setExpanded(treeIds)}
        >
          <MdOutlineExpand />
          Expand
        </button>
        <button
          className="flex justify-center items-center"
          onClick={() => setExpanded([])}
        >
          <BiSolidCheckboxMinus />
          Colapse All
        </button>
      </div>
      {semanticoResult && semanticoResult[2] && (
        <SimpleTreeView
        expandedItems={expandedItems}
        onExpandedItemsChange={(_, items) => setExpanded(items)}
        >
          <TreeNode showAttributes node={semanticoResult[2]}></TreeNode>
        </SimpleTreeView>
      )}
    </div>
  );
}
