import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `AssignedIdentifier ::= ObjectIdentifierValue | DefinedValue | empty`
 *
 * NOTE: Even though this can be empty, the empty alternative is ignored so that
 * the GlobalModuleReference parser can determine whether the whitespace following
 * the modulereference precedes an AssignedIdentifier, or if it belongs to
 * another production, and hence, should remain unconsumed.
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ObjectIdentifierValue, parserFor.DefinedValue],
      ProductionType.AssignedIdentifier
    )
);
