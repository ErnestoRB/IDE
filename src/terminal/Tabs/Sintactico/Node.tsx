import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { v4 as uuidv4 } from "uuid";
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

  let nodeKeys = Object.keys(node);
  return (
    <TreeItem itemId={uuidv4()} label={nodeKeys[0]}>
      <div className="flex">
        {nodeKeys.map((key) => {
          let value = node[key];
          if (typeof value == "object") {
            return <Node node={value}></Node>;
          }
          return (
            <p key={key}>
              {key}: {value}
            </p>
          );
        })}
      </div>
    </TreeItem>
  );

  //  return <div className="border-2 border-black">{JSON.stringify(node)}</div>;
}
