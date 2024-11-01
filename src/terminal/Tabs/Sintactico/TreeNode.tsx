import { TreeNode as ITreeNode } from "../../../build/parse";
import { Node } from "./Node";

export function TreeNode({
  node,
  showAttributes = false,
}: {
  node: ITreeNode;
  showAttributes?: boolean;
}) {
  if (!node) {
    return null;
  }

  return (
    <>
      <Node showAttributes={showAttributes} node={node.node} />
      {node.sibling && (
        <TreeNode showAttributes={showAttributes} node={node.sibling} />
      )}
    </>
  );
}
