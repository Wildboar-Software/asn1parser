import {
  assert,
  literal,
  recursiveParser,
  commaDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ComponentRelationConstraint ::= "{" DefinedObjectSet "}" "{" AtNotation "," + "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ComponentRelationConstraint, [
      literal(ProductionType.curlyOpening),
      parserFor.DefinedObjectSet,
      literal(ProductionType.curlyClosing),
      literal(ProductionType.curlyOpening),
      commaDelimitedList(ProductionType.AtNotation, parserFor.AtNotation), // FIXME:
      assert(
        literal(ProductionType.curlyClosing),
        literal(ProductionType.curlyClosing),
        '3BD27503-7098-4008-A43E-4E0E3941F9AC'
      ),
    ])
);
