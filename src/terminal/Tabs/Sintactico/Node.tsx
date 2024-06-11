import { TreeItem } from "@mui/x-tree-view";
import { v4 as uuidv4 } from "uuid";

export function Node({ node }: any) {
  if (!node) {
    return null;
  }

  const renderNode = (node: any, isFirstLevel: boolean = true) => {
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
                <TreeItem key={uuidv4()} itemId={uuidv4()} label={`${value.Var.name}`}>
                </TreeItem>
              );
            }
            if (key === "Stmt" && isFirstLevel) {
              return Object.keys(value).map((stmtKey) => {
                const stmtValue = value[stmtKey];
                if (stmtKey === "In") {
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`In: ${stmtValue.name}`}>
                    </TreeItem>
                  );
                }
                if (stmtKey === "Out") {
                  const expressionValue = stmtValue.expression;
                  const value = expressionValue?.Exp?.kind?.Const?.value;
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`Out: ${value}`}>
                    </TreeItem>
                  );
                }
                if (stmtKey === "Assign") {
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`Assign: ${stmtValue.name}`}>
                      {renderNode(stmtValue)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "If") {
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`If Condition`}>
                      {renderNode(stmtValue, false)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "While") {
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`While Condition`}>
                      {renderNode(stmtValue, false)}
                    </TreeItem>
                  );
                }
                if (stmtKey === "Do") {
                  return (
                    <TreeItem key={uuidv4()} itemId={uuidv4()} label={`Do Condition`}>
                      {renderNode(stmtValue, false)}
                    </TreeItem>
                  );
                }
                return null;
              });
            }

            return (
              <TreeItem key={uuidv4()} itemId={uuidv4()} label={key}>
                {renderNode(value, false)}
              </TreeItem>
            );
          }
          return (
            <TreeItem key={uuidv4()} itemId={uuidv4()} label={`${key}: ${value}`} />
          );
        })}
      </>
    );
  };

  return renderNode(node);
}
