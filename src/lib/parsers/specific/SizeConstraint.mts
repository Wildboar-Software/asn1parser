import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import Constraint from '../optimized/SizeConstraintConstraint.mjs';

/**
 * @summary Efficient `SizeConstraint` parser that only uses the
 *  `SubtypeConstraint` alternative of `Constraint`.
 * @description
 * Even though the lexical specification says that `SizeConstraint` is
 * specified like so:
 *
 * `SizeConstraint ::= SIZE Constraint`
 *
 * From ITU X.680 2015, Section 51.5.3:
 *
 * > The "Constraint" shall use the "SubtypeConstraint" alternative of
 * > "ConstraintSpec".
 *
 * Note, however, that a `Constraint` must still be used for the parser,
 * because `SubtypeConstraint` is not strictly an alternative within
 * `Constraint`, but an alternative of only a subset of `Constraint`.
 * Namely, `Constraint` also includes the surrounding parentheses.
 *
 * This parser cuts out unnecessary and invalid parsing by only parsing the
 * permitted alternatives of `Constraint`. It does this with another optimized
 * parser for `Constraint`.
 *
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SizeConstraint, [
      literal(ProductionType._SIZE),
      assert(
        Constraint,
        literal(ProductionType.parenthesisClosing),
        '806F569F-866D-4551-89AB-644E3C214729'
      ),
    ])
);
