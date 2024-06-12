import { TreeItem } from "@mui/x-tree-view";
import { v4 as uuidv4 } from "uuid";
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
            if (key === "Decl" && value.Var) {
              return (
                <TreeItem
                  key={uuidv4()}
                  itemId={uuidv4()}
                  label={`Decl (${value.Var.name})`}
                ></TreeItem>
              );
            }
            if (key === "Exp") {
              return Object.keys(value.kind).map((expKey) => {
                const expValue = value.kind[expKey];
                if (expKey == "Op") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
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
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`Exp (Const) ${constValue}`}
                    ></TreeItem>
                  );
                }
                if (expKey === "Id") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`Exp (Id): ${expValue.name}`}
                    ></TreeItem>
                  );
                }
                return null;
              });
            }

            if (key === "Stmt") {
              return Object.keys(value).map((stmtKey) => {
                const stmtValue = value[stmtKey];
                if (stmtKey === "In") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`In: ${stmtValue.name}`}
                    ></TreeItem>
                  );
                }
                if (stmtKey === "Out") {
                  const expressionValue = stmtValue.expression;
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`Out`}>
                      {renderNode(expressionValue)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "Assign") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`Assign: ${stmtValue.name}`}
                    >
                      {renderNode(stmtValue.value)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "If") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`If Condition`}
                    >
                      <TreeItem itemId={uuidv4()} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={uuidv4()} label="then">
                        <TreeNode node={stmtValue.then_branch}></TreeNode>
                      </TreeItem>
                      <TreeItem itemId={uuidv4()} label="else">
                        <TreeNode node={stmtValue.else_branch}></TreeNode>
                      </TreeItem>
                    </TreeItem>
                  );
                }
                if (stmtKey === "While") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`While Condition`}
                    >
                      <TreeItem itemId={uuidv4()} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={uuidv4()} label="body">
                        <TreeNode node={stmtValue.body}></TreeNode>{" "}
                      </TreeItem>
                    </TreeItem>
                  );
                }
                if (stmtKey === "Do") {
                  return (
                    <TreeItem
                      key={uuidv4()}
                      itemId={uuidv4()}
                      label={`Do Condition`}
                    >
                      <TreeItem itemId={uuidv4()} label="condition">
                        {renderNode(stmtValue.condition)}
                      </TreeItem>
                      <TreeItem itemId={uuidv4()} label="body">
                        <TreeNode node={stmtValue.body}></TreeNode>{" "}
                      </TreeItem>
                    </TreeItem>
                  );
                }
                return null;
              });
            }

            return (
              <TreeItem key={uuidv4()} itemId={uuidv4()} label={key}>
                {renderNode(value)}
              </TreeItem>
            );
          }
          return (
            <TreeItem
              key={uuidv4()}
              itemId={uuidv4()}
              label={`${key}: ${value}`}
            />
          );
        })}
      </>
    );
  };

  return renderNode(node);
}
