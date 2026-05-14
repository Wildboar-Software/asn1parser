import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedValueSetType ::= SimpleDefinedType ActualParameterList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedValueSetType, [
      parserFor.SimpleDefinedType,
      parserFor.ActualParameterList,
    ])
);
