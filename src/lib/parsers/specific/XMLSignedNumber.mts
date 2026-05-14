import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
  aliasFor,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
