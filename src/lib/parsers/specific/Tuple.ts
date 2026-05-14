import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
