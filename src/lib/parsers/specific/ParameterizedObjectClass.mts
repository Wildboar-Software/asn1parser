import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedObjectClass ::= DefinedObjectClass ActualParameterList`
 */
export const ParameterizedObjectClass: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedObjectClass, [
      parserFor.DefinedObjectClass,
      parserFor.ActualParameterList,
    ])
);
export default ParameterizedObjectClass;
