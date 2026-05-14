import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinedObject ::= ExternalObjectReference | objectreference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalObjectReference, parserFor.objectreference],
      ProductionType.DefinedObject
    )
);
