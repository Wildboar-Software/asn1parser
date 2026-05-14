import type Production from './Production.js';
import ProductionType from './ProductionType.js';

/**
 * @summary Split an AST into subtrees by the given production type.
 * @param {Production} prod The given subtree of the AST to split.
 * @param {ProductionType} type_ The type on which to split.
 * @returns {Production[]} Subtrees produced by the splitting.
 * @function
 */
export default function split(
  prod: Production,
  type_: ProductionType = ProductionType.whitespace
): Production[] {
  return prod.children
    .filter((child: Production): boolean => child.type !== type_)
    .flatMap((child: Production) =>
      child.children.length > 0 ? split(child, type_) : child
    );
}
