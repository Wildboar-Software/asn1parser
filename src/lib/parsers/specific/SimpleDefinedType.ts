import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SimpleDefinedType ::= ExternalTypeReference | typereference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalTypeReference, parserFor.typereference],
      ProductionType.SimpleDefinedType
    )
);
