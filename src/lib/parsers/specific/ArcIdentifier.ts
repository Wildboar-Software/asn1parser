import choiceOf from '../generic/choiceOf.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import literal from '../generic/literal.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * `ArcIdentifier ::= integerUnicodeLabel | non-integerUnicodeLabel`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.number, ProductionType.integerUnicodeLabel),
        literal(
          ProductionType.identifier,
          ProductionType.nonIntegerUnicodeLabel
        ),
      ],
      ProductionType.ArcIdentifier
    )
);
