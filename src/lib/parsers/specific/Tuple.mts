import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Tuple ::= "{" TableColumn "," TableRow "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.Tuple, [
      literal(ProductionType.curlyOpening),
      parserFor.TableColumn,
      literal(ProductionType.comma),
      parserFor.TableRow,
      literal(ProductionType.curlyClosing),
    ])
);
