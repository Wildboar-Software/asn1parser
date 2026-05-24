import { aliasFor, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.mjs';

/**
 * `SubtypeConstraint ::= ElementSetSpecs`
 */
export const SubtypeConstraint: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.SubtypeConstraint, ElementSetSpecs)
);
export default SubtypeConstraint;
