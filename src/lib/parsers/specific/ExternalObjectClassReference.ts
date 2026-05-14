import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
