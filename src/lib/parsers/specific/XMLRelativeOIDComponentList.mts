import { periodDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLRelativeOIDComponentList ::=
 *      XMLRelativeOIDComponent
 *      | XMLRelativeOIDComponent & "." & XMLRelativeOIDComponentList`
 */
export default recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.XMLRelativeOIDComponentList,
      parserFor.XMLRelativeOIDComponent
    )
);
