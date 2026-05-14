import {
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
