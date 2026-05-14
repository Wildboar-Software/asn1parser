import {
  recursiveParser,
  choiceOf,
  literal,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
