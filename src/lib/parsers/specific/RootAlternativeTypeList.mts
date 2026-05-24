import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RootAlternativeTypeList ::= AlternativeTypeList`
 */
export const RootAlternativeTypeList: Parser = recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.RootAlternativeTypeList,
      parserFor.AlternativeTypeList
    )
);
export default RootAlternativeTypeList;
