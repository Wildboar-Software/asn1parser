import { periodDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLObjIdComponentList ::= XMLObjIdComponent | XMLObjIdComponent & "." & XMLObjIdComponentList`
 */
export const XMLObjIdComponentList: Parser = recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.XMLObjIdComponentList,
      parserFor.XMLObjIdComponent
    )
);
export default XMLObjIdComponentList;
