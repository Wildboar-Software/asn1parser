import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
