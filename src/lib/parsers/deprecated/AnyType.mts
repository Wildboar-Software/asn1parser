import {
  recursiveParser,
  choiceOf,
  literal,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `AnyType ::= ANY | ANY DEFINED BY identifier`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.AnyType, [
        literal(ProductionType._ANY),
        literal(ProductionType._DEFINED),
        literal(ProductionType._BY),
        literal(ProductionType.identifier),
      ]),
      literal(ProductionType._ANY, ProductionType.AnyType),
    ])
);
