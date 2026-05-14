import {
  anything,
  assert,
  commaDelimitedList,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `UserDefinedConstraint ::= CONSTRAINED BY "{" UserDefinedConstraintParameter "," * "}"`
 */
export default recursiveParser(
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
      ), // FIXME:
      assert(
        literal(ProductionType.curlyClosing),
        anything,
        '986E524B-9A9A-4D5B-95D8-12BCC801EB81'
      ),
    ])
);
