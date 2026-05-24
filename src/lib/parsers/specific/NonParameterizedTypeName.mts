import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NonParameterizedTypeName ::= ExternalTypeReference | typereference | xmlasn1typename`
 */
export const NonParameterizedTypeName: Parser = recursiveParser(
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
export default NonParameterizedTypeName;
