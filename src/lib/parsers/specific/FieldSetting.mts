import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FieldSetting ::= PrimitiveFieldName Setting`
 */
export const FieldSetting: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.FieldSetting, [
      parserFor.PrimitiveFieldName,
      parserFor.Setting,
    ])
);
export default FieldSetting;
