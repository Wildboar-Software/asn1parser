import {
  literal,
  recursiveParser,
  sequenceOf,
  aliasFor,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.objectsetfieldreference, [
      literal(ProductionType.ampersand),
      aliasFor(ProductionType.objectsetreference, parserFor.typereference),
    ])
);
