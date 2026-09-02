import {
  choiceOf,
  recursiveParser,
  when,
  canStartOpenTypeFieldVal,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `Value ::= BuiltinValue | ReferencedValue | ObjectClassFieldValue`
 */
export const Value: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        when(canStartOpenTypeFieldVal, parserFor.ObjectClassFieldValue),
        parserFor.BuiltinValue,
        parserFor.ReferencedValue,
      ],
      ProductionType.Value
    )
);
export default Value;
