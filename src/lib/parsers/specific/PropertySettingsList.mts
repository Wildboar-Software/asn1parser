import { recursiveParser, whitespaceDelimitedList } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PropertySettingsList ::= PropertyAndSettingPair | PropertySettingsList PropertyAndSettingPair`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(
      ProductionType.PropertySettingsList,
      parserFor.PropertyAndSettingPair
    )
);
