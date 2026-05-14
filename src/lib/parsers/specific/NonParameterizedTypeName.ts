import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NonParameterizedTypeName ::= ExternalTypeReference | typereference | xmlasn1typename`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ExternalTypeReference,
        parserFor.typereference,
        literal(ProductionType.xmlasn1typename),
      ],
      ProductionType.NonParameterizedTypeName
    )
);
