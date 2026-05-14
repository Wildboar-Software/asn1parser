import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.js';

/**
 * `ValueSet ::= "{" ElementSetSpecs "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueSet, [
      literal(ProductionType.curlyOpening),
      ElementSetSpecs,
      literal(ProductionType.curlyClosing),
    ])
);
