import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
