import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RootComponentTypeList ::= ComponentTypeList`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.RootComponentTypeList, parserFor.ComponentTypeList)
);
