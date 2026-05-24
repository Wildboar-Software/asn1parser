import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal`
 */
export const ObjectClassFieldValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.OpenTypeFieldVal,
        /**
         * Commented out because all of its alternatives are already covered by
         * `Value`, which is the only place where this is used.
         */
        // parserFor.FixedTypeFieldVal, // Only used here.
      ],
      ProductionType.ObjectClassFieldValue
    )
);
export default ObjectClassFieldValue;
