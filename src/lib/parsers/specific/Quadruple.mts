import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Quadruple ::= "{" Group "," Plane "," Row "," Cell "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.Quadruple, [
      literal(ProductionType.curlyOpening),
      parserFor.Group,
      literal(ProductionType.comma),
      parserFor.Plane,
      literal(ProductionType.comma),
      parserFor.Row,
      literal(ProductionType.comma),
      parserFor.Cell,
      literal(ProductionType.curlyClosing),
    ])
);
