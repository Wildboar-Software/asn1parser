import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLRelativeOIDComponent ::= XMLNumberForm | XMLNameAndNumberForm`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLNumberForm, parserFor.XMLNameAndNumberForm],
      ProductionType.XMLRelativeOIDComponent
    )
);
