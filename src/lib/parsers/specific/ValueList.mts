import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ValueList ::= Value | ValueList "," Value`
 */
export default recursiveParser(
  (): Parser => commaDelimitedList(ProductionType.ValueList, parserFor.Value)
);
