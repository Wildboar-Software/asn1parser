import {
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
 * `InnerTypeConstraints ::= WITH COMPONENT SingleTypeConstraint | WITH COMPONENTS MultipleTypeConstraints`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.InnerTypeConstraints, [
        literal(ProductionType._WITH),
        literal(ProductionType._COMPONENT),
        assert(
          parserFor.SingleTypeConstraint,
          literal(ProductionType.parenthesisClosing),
          '2AB39594-4D33-4EC2-B5B7-7966790B1095'
        ),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.InnerTypeConstraints, [
        literal(ProductionType._WITH),
        literal(ProductionType._COMPONENTS),
        assert(
          parserFor.MultipleTypeConstraints,
          literal(ProductionType.parenthesisClosing),
          '4B9EBE82-37A3-4105-BAE1-76CB7BC6BB47'
        ),
      ]),
    ])
);
