import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedObjectSet ::= DefinedObjectSet ActualParameterList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedObjectSet, [
      parserFor.DefinedObjectSet,
      parserFor.ActualParameterList,
    ])
);
