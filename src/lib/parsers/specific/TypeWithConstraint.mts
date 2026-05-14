import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TypeWithConstraint ::=
 *        SET Constraint OF Type
 *      | SET SizeConstraint OF Type
 *      | SEQUENCE Constraint OF Type
 *      | SEQUENCE SizeConstraint OF Type
 *      | SET Constraint OF NamedType
 *      | SET SizeConstraint OF NamedType
 *      | SEQUENCE Constraint OF NamedType
 *      | SEQUENCE SizeConstraint OF NamedType`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.TypeWithConstraint, [
      choiceOf([
        literal(ProductionType._SET),
        literal(ProductionType._SEQUENCE),
      ]),
      /**
       * From ITU X.680, Section 49.5:
       * "NOTE – Although the "Constraint" alternatives encompass the
       * corresponding "SizeConstraint" alternatives, the "SizeConstraint"
       * alternatives are provided for historical reasons."
       *
       * However, the "Constraint" production includes enclosing parentheses,
       * which "SizeConstraint" does not, so the separate "SizeConstraint" still
       * must be included.
       */
      choiceOf([parserFor.SizeConstraint, parserFor.Constraint]),
      assert(
        literal(ProductionType._OF),
        choiceOf([parserFor.NamedType, parserFor.Type]),
        '5629D716-00E0-4810-91CC-11B6407B6896'
      ),
      assert(
        choiceOf([parserFor.NamedType, parserFor.Type]),
        anything,
        '1827E14F-AC37-4ADE-877C-128418AA4520'
      ),
    ])
);
