import {
  choiceOf,
  limitConstructedNesting,
  literal,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `SetValue ::= "{" ComponentValueList "}" | "{" "}"`
 */
export const SetValue: Parser = limitConstructedNesting(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.SetValue, [
        literal(ProductionType.curlyOpening),
        parserFor.ComponentValueList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SetValue, [
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
    ])
);
export default SetValue;
