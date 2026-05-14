import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLIntegerValue ::= XMLSignedNumber | EmptyElementInteger | TextInteger`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.XMLSignedNumber,
        parserFor.EmptyElementInteger,
        parserFor.TextInteger,
      ],
      ProductionType.XMLIntegerValue
    )
);
