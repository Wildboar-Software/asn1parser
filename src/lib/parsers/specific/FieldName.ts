import { periodDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `FieldName ::= PrimitiveFieldName "." +`
 */
export default recursiveParser(
  (): Parser =>
    periodDelimitedList(ProductionType.FieldName, parserFor.PrimitiveFieldName)
);
