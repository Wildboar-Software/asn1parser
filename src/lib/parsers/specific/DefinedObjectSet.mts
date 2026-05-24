import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinedObjectSet ::= ExternalObjectSetReference | objectsetreference`
 */
export const DefinedObjectSet: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalObjectSetReference, parserFor.objectsetreference],
      ProductionType.DefinedObjectSet
    )
);
export default DefinedObjectSet;
