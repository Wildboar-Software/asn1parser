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
