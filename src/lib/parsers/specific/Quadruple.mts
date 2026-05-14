import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
