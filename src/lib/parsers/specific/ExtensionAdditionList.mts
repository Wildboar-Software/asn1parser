import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionAdditionList ::= ExtensionAddition | ExtensionAdditionList "," ExtensionAddition`
 */
export const ExtensionAdditionList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.ExtensionAdditionList,
      parserFor.ExtensionAddition
    )
);
export default ExtensionAdditionList;
