import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
  aliasFor,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLSignedNumber ::= number | "-" & number`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.XMLSignedNumber, [
        literal(ProductionType.hyphen),
        literal(ProductionType.number),
      ]),
      aliasFor(ProductionType.XMLSignedNumber, literal(ProductionType.number)),
    ])
);
