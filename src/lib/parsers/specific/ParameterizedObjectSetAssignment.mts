import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedObjectSetAssignment ::= objectsetreference ParameterList DefinedObjectClass "::=" ObjectSet`
 */
export const ParameterizedObjectSetAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(
      ProductionType.ParameterizedObjectClassAssignment,
      [
        parserFor.objectsetreference,
        parserFor.ParameterList,
        parserFor.DefinedObjectClass,
        literal(ProductionType.assignment),
        parserFor.ObjectSet,
      ]
    )
);
export default ParameterizedObjectSetAssignment;
