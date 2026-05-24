import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLFixedTypeFieldVal ::= XMLBuiltinValue`
 */
export const XMLFixedTypeFieldVal: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.XMLFixedTypeFieldVal, parserFor.XMLBuiltinValue)
);
export default XMLFixedTypeFieldVal;
