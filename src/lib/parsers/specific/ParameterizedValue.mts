import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedValue ::= SimpleDefinedValue ActualParameterList`
 */
export const ParameterizedValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedValue, [
      parserFor.SimpleDefinedValue,
      parserFor.ActualParameterList,
    ])
);
export default ParameterizedValue;
