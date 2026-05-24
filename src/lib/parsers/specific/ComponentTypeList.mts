import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ComponentTypeList ::= ComponentType | ComponentTypeList "," ComponentType`
 */
export const ComponentTypeList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.ComponentTypeList,
      parserFor.ComponentType
    )
);
export default ComponentTypeList;
