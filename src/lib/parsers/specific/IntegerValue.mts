import {
  choiceOf,
  // literal,
  recursiveParser,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `IntegerValue ::= SignedNumber | identifier`
 */
export const IntegerValue: Parser = recursiveParser(
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
export default IntegerValue;
