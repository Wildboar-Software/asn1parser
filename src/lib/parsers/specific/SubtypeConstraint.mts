import { aliasFor, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.mjs';

/**
 * `SubtypeConstraint ::= ElementSetSpecs`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.SubtypeConstraint, ElementSetSpecs)
);
