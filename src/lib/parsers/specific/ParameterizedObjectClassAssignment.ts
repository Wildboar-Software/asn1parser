import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedObjectClassAssignment ::= objectclassreference ParameterList "::=" ObjectClass`
 */
export default recursiveParser(
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
