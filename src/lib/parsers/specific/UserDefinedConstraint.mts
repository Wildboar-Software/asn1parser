import {
  anything,
  assert,
  commaDelimitedList,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `UserDefinedConstraint ::= CONSTRAINED BY "{" UserDefinedConstraintParameter "," * "}"`
 */
export const UserDefinedConstraint: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.UserDefinedConstraint, [
      literal(ProductionType._CONSTRAINED),
      assert(
        literal(ProductionType._BY),
        literal(ProductionType.curlyOpening),
        '92DFF30C-1CB8-4452-975E-A6200FB53013'
      ),
      assert(
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
        '7CFE419A-1DB8-4EF1-A17C-D1FDE7AEB1BE'
      ),
      optional(
        commaDelimitedList(
          ProductionType.UserDefinedConstraintParameter,
          parserFor.UserDefinedConstraintParameter
        )
      ),
      assert(
        literal(ProductionType.curlyClosing),
        anything,
        '986E524B-9A9A-4D5B-95D8-12BCC801EB81'
      ),
    ])
);
export default UserDefinedConstraint;
