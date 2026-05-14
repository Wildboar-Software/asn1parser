import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Constraint ::= "(" ConstraintSpec ExceptionSpec ")"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.Constraint, [
      literal(ProductionType.parenthesisOpening),
      parserFor.ConstraintSpec,
      parserFor.ExceptionSpec,
      assert(
        literal(ProductionType.parenthesisClosing),
        literal(ProductionType.parenthesisClosing),
        '220A6EA6-786F-4BA3-93D1-71FC3E39C938'
      ),
    ])
);
