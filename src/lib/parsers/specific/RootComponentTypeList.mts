import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RootComponentTypeList ::= ComponentTypeList`
 */
export const RootComponentTypeList: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.RootComponentTypeList, parserFor.ComponentTypeList)
);
export default RootComponentTypeList;
