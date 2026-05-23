import type Production from "./Production.mjs";
import ProductionType from './ProductionType.mjs';

/**
 * @summary Doubly-link the concrete syntax tree (CST)
 * @description
 * 
 * This function links every node in the concrete syntax tree (CST) with its
 * parent, and iterates into the child nodes of `node` to do the same,
 * recursively. This is desirable because, if given a CST node, you can then
 * traverse upwards in the CST to find the containing production.
 * 
 * @param node The concrete syntax tree (CST) node to modify along with its
 *  child nodes.
 * @param parent The parent of the concrete syntax tree (CST) node, `node` 
 * @param depthTTL The number of recursions deep into the tree before stopping.
 */
export function doublyLinkCST<Types extends ProductionType = ProductionType>  (
    node: Production<Types>,
    parent?: Production<Types>,
    depthTTL: number = 100,
): void {
    node.parent = parent;
    if (depthTTL <= 0) {
        return;
    }
    for (const child of node.children) {
        doublyLinkCST(child, node, depthTTL - 1);
    }
}

export default doublyLinkCST;
