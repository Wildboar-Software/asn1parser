import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `FieldSetting ::= PrimitiveFieldName Setting`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.FieldSetting, [
      parserFor.PrimitiveFieldName,
      parserFor.Setting,
    ])
);
