import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedObjectClassAssignment ::= objectclassreference ParameterList "::=" ObjectClass`
 */
export const ParameterizedObjectClassAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(
      ProductionType.ParameterizedObjectClassAssignment,
      [
        literal(ProductionType.objectclassreference),
        parserFor.ParameterList,
        literal(ProductionType.assignment),
        parserFor.ObjectClass,
      ]
    )
);
export default ParameterizedObjectClassAssignment;
