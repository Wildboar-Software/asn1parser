import { commaDelimitedList, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
