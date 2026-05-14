import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExternalObjectClassReference ::= modulereference "." objectclassreference`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExternalObjectClassReference, [
      parserFor.modulereference,
      literal(ProductionType.period),
      literal(ProductionType.objectclassreference),
    ])
);
