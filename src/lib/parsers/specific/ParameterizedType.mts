import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedType ::= SimpleDefinedType ActualParameterList`
 */
export const ParameterizedType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedType, [
      parserFor.SimpleDefinedType,
      parserFor.ActualParameterList,
    ])
);
export default ParameterizedType;
