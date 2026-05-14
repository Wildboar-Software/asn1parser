import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
