import { TreeNode as ITreeNode } from "../../../build/parse";
import { Node } from "./Node";

export function TreeNode({ node }: { node: ITreeNode }) {
  if (!node) {
    return null;
  }

  return (
    <>
      <Node node={node.node} />
      {node.sibling && <TreeNode node={node.sibling} />}
    </>
  );
}
