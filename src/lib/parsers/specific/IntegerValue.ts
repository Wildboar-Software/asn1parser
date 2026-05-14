import {
  choiceOf,
  // literal,
  recursiveParser,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `IntegerValue ::= SignedNumber | identifier`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.SignedNumber,
        /**
         * `identifier` must be commented out, because there are many other `Value`
         * alternatives that could being with an `identifier` that must be attempted
         * first.
         */
        // literal(ProductionType.identifier),
      ],
      ProductionType.IntegerValue
    )
);
