import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SimpleDefinedType ::= ExternalTypeReference | typereference`
 */
export const SimpleDefinedType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ExternalTypeReference, parserFor.typereference],
      ProductionType.SimpleDefinedType
    )
);
export default SimpleDefinedType;
