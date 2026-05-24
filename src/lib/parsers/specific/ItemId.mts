import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ItemId ::= ItemSpec`
 */
export const ItemId: Parser = recursiveParser(
  (): Parser => aliasFor(ProductionType.ItemId, parserFor.ItemSpec)
);
export default ItemId;
