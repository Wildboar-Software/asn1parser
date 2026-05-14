import { periodDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLObjIdComponentList ::= XMLObjIdComponent | XMLObjIdComponent & "." & XMLObjIdComponentList`
 */
export default recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.XMLObjIdComponentList,
      parserFor.XMLObjIdComponent
    )
);
