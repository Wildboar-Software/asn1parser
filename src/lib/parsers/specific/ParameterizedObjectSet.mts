import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedObjectSet ::= DefinedObjectSet ActualParameterList`
 */
export const ParameterizedObjectSet: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedObjectSet, [
      parserFor.DefinedObjectSet,
      parserFor.ActualParameterList,
    ])
);
export default ParameterizedObjectSet;
