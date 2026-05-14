import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExternalTypeReference ::= modulereference "." typereference`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExternalObjectSetReference, [
      parserFor.modulereference,
      literal(ProductionType.period),
      parserFor.typereference,
    ])
);
