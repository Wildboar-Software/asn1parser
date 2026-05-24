import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SettingName ::= psname`
 */
export const SettingName: Parser = recursiveParser(
  (): Parser => literal(ProductionType.psname, ProductionType.SettingName)
);
export default SettingName;
