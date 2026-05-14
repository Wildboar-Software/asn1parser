import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedObjectSetAssignment ::= objectsetreference ParameterList DefinedObjectClass "::=" ObjectSet`
 */
export default recursiveParser(
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
