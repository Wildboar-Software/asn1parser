import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal`
 */
export default recursiveParser(
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
