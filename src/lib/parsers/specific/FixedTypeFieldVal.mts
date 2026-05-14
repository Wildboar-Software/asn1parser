import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FixedTypeFieldVal ::= BuiltinValue | ReferencedValue`
 * NOTE: This was removed as an alternative of `ObjectClassFieldValue`, because
 * it is only used by `ObjectClassFieldValue`, and `ObjectClassFieldValue` is
 * only used by `BuiltinValue`, and `BuiltinValue` already has alternatives that
 * cover those of `FixedTypeFieldVal`.
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.BuiltinValue,
        parserFor.ReferencedValue, // `ReferencedValue ::= DefinedValue | ValueFromObject`
      ],
      ProductionType.FixedTypeFieldVal
    )
);
