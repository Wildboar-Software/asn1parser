import { recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
