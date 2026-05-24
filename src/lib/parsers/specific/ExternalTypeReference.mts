import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExternalTypeReference ::= modulereference "." typereference`
 */
export const ExternalTypeReference: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExternalObjectSetReference, [
      parserFor.modulereference,
      literal(ProductionType.period),
      parserFor.typereference,
    ])
);
export default ExternalTypeReference;
