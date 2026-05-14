import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ValueList ::= Value | ValueList "," Value`
 */
export default recursiveParser(
  (): Parser => commaDelimitedList(ProductionType.ValueList, parserFor.Value)
);
