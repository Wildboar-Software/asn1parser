import {
  choiceOf,
  recursiveParser,
  aliasFor,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ConstrainedType ::= Type Constraint | TypeWithConstraint`
 */
export const ConstrainedType: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(ProductionType.ConstrainedType, parserFor.TypeWithConstraint),
      whitespaceTolerantSequenceOf(ProductionType.ConstrainedType, [
        /**
         * This is the same as "Type," but with the
         * ConstrainedType removed to prevent infinite recursion.
         *
         * Note that this behavior is not specified in the ASN.1 standards,
         * so it may be incorrect.
         */
        recursiveParser(
          (): Parser =>
            choiceOf(
              [parserFor.BuiltinType, parserFor.ReferencedType],
              ProductionType.Type
            )
        ),
        whitespaceOptionalDelimitedList(
          ProductionType.Constraints,
          parserFor.Constraint
        ),
      ]),
    ])
);
export default ConstrainedType;
