import {
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ItemSpec ::= typereference | ItemId "." ComponentId`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ItemSpec, [
        parserFor.ItemId,
        literal(ProductionType.period),
        parserFor.ComponentId,
      ]),
      aliasFor(ProductionType.ItemSpec, parserFor.typereference),
    ])
);
