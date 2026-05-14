import { recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLRelativeOIDValue ::= XMLRelativeOIDComponentList`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.XMLRelativeOIDValue,
      parserFor.XMLRelativeOIDComponentList
    )
);
