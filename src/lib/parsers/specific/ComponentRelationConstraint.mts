import {
  assert,
  literal,
  recursiveParser,
  commaDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
