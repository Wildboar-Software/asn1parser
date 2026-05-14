import ProductionType from './ProductionType.js';
import type Production from './Production.js';

/**
 * @summary Recursively search a subtree of the AST by production type.
 * @description
 * Recursively searches a subtree of the AST and returns the first production
 * whose type matches the supplied production type. If no such production is
 * found, it returns `undefined`.
 *
 * @param {ProductionType} type_ The production type that is to be found.
 * @param {Production} prod The production at the top of the AST subtree that is
 *  to be searched recursively for a production whose type is `type_`
 * @returns The matching `Production`, if one is found, otherwise `undefined`.
 */
export default function find(
  type_: ProductionType,
  prod: Production
): Production | undefined {
  return prod.type === type_ ? prod : prod.children.find((p) => find(type_, p));
}
