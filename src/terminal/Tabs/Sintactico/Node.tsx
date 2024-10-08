import { TreeItem } from "@mui/x-tree-view";
import { TreeNode } from "./TreeNode";
import { Node as INode } from "../../../build/parse";
import { getExpValueAsString } from "../../../build/analyze";

export function Node({
  node,
  showAttributes = false,
}: {
  node: INode;
  showAttributes?: boolean;
}) {
  if (!node) {
    return null;
  }

  const nodeKeys = Object.keys(node);

  return (
    <>
      {nodeKeys.map((key) => {
        const value = node[key];
        if (key === "children") return null;
        if (typeof value === "object" && value !== null) {
          // Verifica si node.Decl está presente
          if (key === "Decl" && value.kind.Var) {
            const id = node.Decl.id;
            return (
              <TreeItem
                key={id}
                itemId={id}
                label={`${value.kind.Var.typ}: ${value.kind.Var.name}`}
              ></TreeItem>
            );
          }
          if (key === "Exp") {
            const id = node.Exp.id;
            const val = node.Exp.val;
            const type = node.Exp.typ;
            const attributes = showAttributes
              ? `Type: ${type} | Value: ${getExpValueAsString(val)}`
              : "";
            // console.log(val, showAttributes, attributes);
            return Object.keys(value.kind).map((expKey) => {
              const expValue = value.kind[expKey];
              if (expKey == "Op") {
                return (
                  <TreeItem
                    key={id}
                    itemId={id}
                    label={`Exp (Op) ${expValue.op} ${attributes}`}
                  >
                    <TreeNode
                      showAttributes={showAttributes}
                      node={expValue.left}
                    ></TreeNode>
                    <TreeNode
                      showAttributes={showAttributes}
                      node={expValue.right}
                    ></TreeNode>
                  </TreeItem>
                );
              }
              if (expKey == "Const" || expKey == "ConstF") {
                let constValue = expValue.value;
                if (expKey === "ConstF") {
                  constValue = constValue.toFixed(2);
                }
                return (
                  <TreeItem
                    key={id}
                    itemId={id}
                    label={`Exp (Const) ${constValue} ${attributes}`}
                  ></TreeItem>
                );
              }
              if (expKey === "Id") {
                return (
                  <TreeItem
                    key={id}
                    itemId={id}
                    label={`Exp (Id): ${expValue.name} ${attributes}`}
                  ></TreeItem>
                );
              }
              return null;
            });
          }

          if (key === "Stmt") {
            const id = node.Stmt.id;
            return Object.keys(value.kind).map((stmtKey) => {
              const stmtValue = value.kind[stmtKey];
              if (stmtKey === "In") {
                return (
                  <TreeItem
                    key={id}
                    itemId={id}
                    label={`In: ${stmtValue.name}`}
                  ></TreeItem>
                );
              }
              if (stmtKey === "Out") {
                const expressionValue = stmtValue.expression;
                return (
                  <TreeItem key={id} itemId={id} label={`Out`}>
                    <TreeNode
                      showAttributes={showAttributes}
                      node={expressionValue}
                    ></TreeNode>
                  </TreeItem>
                );
              }
              if (stmtKey === "Assign") {
                return (
                  <TreeItem
                    key={id}
                    itemId={id}
                    label={`Assign: ${stmtValue.name}`}
                  >
                    <TreeNode
                      showAttributes={showAttributes}
                      node={stmtValue.value}
                    ></TreeNode>
                  </TreeItem>
                );
              }
              if (stmtKey === "If") {
                return (
                  <TreeItem key={id} itemId={id} label={`If Condition`}>
                    <TreeItem itemId={`${id}-0`} label="condition">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.condition}
                      ></TreeNode>
                    </TreeItem>
                    <TreeItem itemId={`${id}-1`} label="then">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.then_branch}
                      ></TreeNode>
                    </TreeItem>
                    <TreeItem itemId={`${id}-2`} label="else">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.else_branch}
                      ></TreeNode>
                    </TreeItem>
                  </TreeItem>
                );
              }
              if (stmtKey === "While") {
                return (
                  <TreeItem key={id} itemId={id} label={`While Condition`}>
                    <TreeItem itemId={`${id}-0`} label="condition">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.condition}
                      ></TreeNode>{" "}
                    </TreeItem>
                    <TreeItem itemId={`${id}-1`} label="body">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.body}
                      ></TreeNode>{" "}
                    </TreeItem>
                  </TreeItem>
                );
              }
              if (stmtKey === "Do") {
                return (
                  <TreeItem key={id} itemId={id} label={`Do Condition`}>
                    <TreeItem itemId={`${id}-0`} label="condition">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.condition}
                      ></TreeNode>
                    </TreeItem>
                    <TreeItem itemId={`${id}-1`} label="body">
                      <TreeNode
                        showAttributes={showAttributes}
                        node={stmtValue.body}
                      ></TreeNode>{" "}
                    </TreeItem>
                  </TreeItem>
                );
              }
              return null;
            });
          }

          return null; // no se debe renderizar otro tipo de nodo
        }
        return <div>{`${key}: ${value}`}</div>;
      })}
    </>
  );
}
