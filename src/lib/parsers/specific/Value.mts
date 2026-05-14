import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Value ::= BuiltinValue | ReferencedValue | ObjectClassFieldValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectClassFieldValue, // Only used here.
        parserFor.BuiltinValue,
        parserFor.ReferencedValue,
      ],
      ProductionType.Value
    )
);
