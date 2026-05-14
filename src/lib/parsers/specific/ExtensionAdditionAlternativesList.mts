import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAdditionAlternativesList ::=
 *      ExtensionAdditionAlternative
 *      | ExtensionAdditionAlternativesList "," ExtensionAdditionAlternative`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.ExtensionAdditionAlternativesList,
      parserFor.ExtensionAdditionAlternative
    )
);
