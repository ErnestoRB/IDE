import { Node } from "./Node";

export function TreeNode({ node }: any) {
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
