import { recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLFixedTypeFieldVal ::= XMLBuiltinValue`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.XMLFixedTypeFieldVal, parserFor.XMLBuiltinValue)
);
