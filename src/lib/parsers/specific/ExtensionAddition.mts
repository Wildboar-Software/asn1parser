import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionAddition ::= ComponentType | ExtensionAdditionGroup`
 */
export const ExtensionAddition: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ComponentType, parserFor.ExtensionAdditionGroup],
      ProductionType.ExtensionAddition
    )
);
export default ExtensionAddition;
