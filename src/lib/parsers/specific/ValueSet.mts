import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.mjs';

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
