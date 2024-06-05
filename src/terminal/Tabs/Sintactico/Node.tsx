import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { v4 as uuidv4 } from "uuid";
import { TreeNode } from "./TreeNode";
export function Node({ node }: any) {
  /* if (node.Decl) {
    return (
      <div className="">{node.Decl.Var && <div>{node.Decl.Var.name}</div>}</div>
    );
  } */
  /* 
  if (node.Stmt) {
    return (
      <div className="">
        {node.Stmt.In && <div>Stdin: {node.Stmt.In.name}</div>}
      </div>
    );
  } */

  if (!node) {
    return null;
  }

  if (node.sibling) {
    return <TreeNode node={node.sibling}></TreeNode>;
  }

  let nodeKeys = Object.keys(node);
  return (
    <>
      {nodeKeys.map((key) => {
        let value = node[key];
        if (key == "children") return null;
        if (typeof value == "object") {
          if (!value) {
            return null;
          }

          if (value.sibling) {
            return <TreeNode node={value.sibling}></TreeNode>;
          }
          return (
            <TreeItem itemId={uuidv4()} label={key}>
              <Node key={key} node={value}></Node>
            </TreeItem>
          );
        }
        return (
          <div className="flex">
            <p key={key}>
              {key}: {value}
            </p>
          </div>
        );
      })}
    </>
  );

  //  return <div className="border-2 border-black">{JSON.stringify(node)}</div>;
}
