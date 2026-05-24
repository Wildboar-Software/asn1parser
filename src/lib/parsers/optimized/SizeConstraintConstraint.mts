import {
  aliasFor,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary Efficient parser for a `SizeConstraint`'s `Constraint`
 * @description
 * From ITU X.680 2015, Section 51.5.3:
 *
 * > The "Constraint" shall use the "SubtypeConstraint" alternative of
 * > "ConstraintSpec".
 *
 * This parser only uses the `SubtypeConstraint` alternative of
 * `ConstraintSpec`.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * Constraint ::= "(" ConstraintSpec ExceptionSpec ")"
 * ```
 *
 * @constant {Parser}
 */
export const SizeConstraintConstraint: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.Constraint, [
      literal(ProductionType.parenthesisOpening),
      aliasFor(ProductionType.ConstraintSpec, parserFor.SubtypeConstraint),
      parserFor.ExceptionSpec,
      assert(
        literal(ProductionType.parenthesisClosing),
        literal(ProductionType.parenthesisClosing),
        '220A6EA6-786F-4BA3-93D1-71FC3E39C938'
      ),
    ])
);
export default SizeConstraintConstraint;
