import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
