import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLObjectIdentifierValue ::= XMLObjIdComponentList`
 */
export const XMLObjectIdentifierValue: Parser = recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.XMLObjectIdentifierValue,
      parserFor.XMLObjIdComponentList
    )
);
export default XMLObjectIdentifierValue;
