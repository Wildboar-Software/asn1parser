import { literal, recursiveParser, sequenceOf } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.typefieldreference, [
      literal(ProductionType.ampersand),
      parserFor.typereference,
    ])
);
