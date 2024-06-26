import { TreeItem } from "@mui/x-tree-view";
import { TreeNode } from "./TreeNode";
import { Node as INode } from "../../../build/parse";

export function Node({ node }: { node: INode }) {
  if (!node) {
    return null;
  }

  const renderNode = (node: any) => {
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
              return Object.keys(value.kind).map((expKey) => {
                const expValue = value.kind[expKey];
                if (expKey == "Op") {
                  return (
                    <TreeItem
                      key={id}
                      itemId={id}
                      label={`Exp (Op) ${expValue.op}`}
                    >
                      {renderNode(expValue.left)}
                      {renderNode(expValue.right)}
                    </TreeItem>
                  );
                }
                if (expKey == "Const" || expKey == "ConstF") {
                  const constValue = expValue.value;
                  return (
                    <TreeItem
                      key={id}
                      itemId={id}
                      label={`Exp (Const) ${constValue}`}
                    ></TreeItem>
                  );
                }
                if (expKey === "Id") {
                  return (
                    <TreeItem
                      key={id}
                      itemId={id}
                      label={`Exp (Id): ${expValue.name}`}
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
                      {renderNode(expressionValue)}
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
                      {renderNode(stmtValue.value)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "If") {
                  return (
                    <TreeItem key={id} itemId={id} label={`If Condition`}>
                      <TreeItem itemId={`${id}-0`} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={`${id}-1`} label="then">
                        <TreeNode node={stmtValue.then_branch}></TreeNode>
                      </TreeItem>
                      <TreeItem itemId={`${id}-2`} label="else">
                        <TreeNode node={stmtValue.else_branch}></TreeNode>
                      </TreeItem>
                    </TreeItem>
                  );
                }
                if (stmtKey === "While") {
                  return (
                    <TreeItem key={id} itemId={id} label={`While Condition`}>
                      <TreeItem itemId={`${id}-0`} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={`${id}-1`} label="body">
                        <TreeNode node={stmtValue.body}></TreeNode>{" "}
                      </TreeItem>
                    </TreeItem>
                  );
                }
                if (stmtKey === "Do") {
                  return (
                    <TreeItem key={id} itemId={id} label={`Do Condition`}>
                      <TreeItem itemId={`${id}-0`} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={`${id}-1`} label="body">
                        <TreeNode node={stmtValue.body}></TreeNode>{" "}
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
  };

  return renderNode(node);
}
