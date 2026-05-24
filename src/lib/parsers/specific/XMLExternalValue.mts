import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLExternalValue ::= XMLSequenceValue`
 */
export const XMLExternalValue: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.XMLExternalValue, parserFor.XMLSequenceValue)
);
export default XMLExternalValue;
