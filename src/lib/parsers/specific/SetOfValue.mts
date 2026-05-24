import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SetOfValue ::= "{" ValueList "}" | "{" NamedValueList "}" | "{" "}"`
 */
export const SetOfValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.SetOfValue, [
        literal(ProductionType.curlyOpening),
        parserFor.ValueList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SetOfValue, [
        literal(ProductionType.curlyOpening),
        parserFor.NamedValueList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SetOfValue, [
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
    ])
);
export default SetOfValue;
