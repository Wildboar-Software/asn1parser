import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
