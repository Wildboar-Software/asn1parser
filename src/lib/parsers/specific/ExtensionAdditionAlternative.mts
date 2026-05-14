import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAdditionAlternative ::= ExtensionAdditionAlternativesGroup | NamedType`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExtensionAdditionAlternativesGroup, parserFor.NamedType],
      ProductionType.ExtensionAdditionAlternative
    )
);
