import choiceOf from '../generic/choiceOf.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import literal from '../generic/literal.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

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
