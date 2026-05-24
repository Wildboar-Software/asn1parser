import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PropertyAndSettingPair ::= PropertyName "=" SettingName`
 */
export const PropertyAndSettingPair: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PropertyAndSettingPair, [
      parserFor.PropertyName,
      literal(ProductionType.equalSign),
      parserFor.SettingName,
    ])
);
export default PropertyAndSettingPair;
