import { aliasFor, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.js';

/**
 * `SubtypeConstraint ::= ElementSetSpecs`
 */
export default recursiveParser(
  (): Parser => aliasFor(ProductionType.SubtypeConstraint, ElementSetSpecs)
);
