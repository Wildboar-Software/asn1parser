import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PropertyAndSettingPair ::= PropertyName "=" SettingName`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PropertyAndSettingPair, [
      parserFor.PropertyName,
      literal(ProductionType.equalSign),
      parserFor.SettingName,
    ])
);
