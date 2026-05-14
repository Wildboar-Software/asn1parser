import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
