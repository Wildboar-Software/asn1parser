import { periodDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
