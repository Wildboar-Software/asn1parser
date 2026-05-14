import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionAddition ::= ComponentType | ExtensionAdditionGroup`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ComponentType, parserFor.ExtensionAdditionGroup],
      ProductionType.ExtensionAddition
    )
);
