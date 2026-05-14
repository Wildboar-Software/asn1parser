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
 * `ObjectIdentifierValue ::= "{" ObjIdComponentsList "}" | "{" DefinedValue ObjIdComponentsList "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ObjectIdentifierValue, [
        literal(ProductionType.curlyOpening),
        parserFor.DefinedValue,
        parserFor.ObjIdComponentsList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.ObjectIdentifierValue, [
        literal(ProductionType.curlyOpening),
        parserFor.ObjIdComponentsList,
        literal(ProductionType.curlyClosing),
      ]),
    ])
);
