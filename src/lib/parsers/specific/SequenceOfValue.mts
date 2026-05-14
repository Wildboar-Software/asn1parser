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
 * `SequenceOfValue ::= "{" ValueList "}" | "{" NamedValueList "}" | "{" "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.SequenceOfValue, [
        literal(ProductionType.curlyOpening),
        parserFor.ValueList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SequenceOfValue, [
        literal(ProductionType.curlyOpening),
        parserFor.NamedValueList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SequenceOfValue, [
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
    ])
);
