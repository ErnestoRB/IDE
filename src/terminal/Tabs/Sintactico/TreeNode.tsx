import { Node } from "./Node";

export function TreeNode({ node }: any) {
  return (
    <>
      <Node node={node.node}></Node>
      {node.sibling && <TreeNode node={node.sibling}></TreeNode>}
    </>
  );
}
