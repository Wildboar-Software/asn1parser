import { literal, recursiveParser, sequenceOf } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.typefieldreference, [
      literal(ProductionType.ampersand),
      parserFor.typereference,
    ])
);
