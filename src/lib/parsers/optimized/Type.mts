import {
  aliasFor,
  choiceOf,
  isTypeWithConstraintStart,
  optional,
  recursiveParser,
  whitespace,
  whitespaceOptionalDelimitedList,
  when,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';

const UnconstrainedType = recursiveParser(
  (): Parser => choiceOf([parserFor.BuiltinType, parserFor.ReferencedType])
);

/**
 * @summary Efficient `Type` parser that does not reparse when it fails to parse
 *  a `Constraint`
 * @description
 * This parser does not re-parse `Type` if it fails to parse a `Constraint`.
 *
 * `TypeWithConstraint` is only attempted when the current token is `SET` or
 * `SEQUENCE` and the following token is `SIZE` or `(`. Other `SEQUENCE`/`SET`
 * forms go straight to `BuiltinType`.
 *
 * This is not a substitute for shrinking `Constraint` inside
 * `TypeWithConstraint`. That production includes both `SIZE Constraint` and
 * parenthesized `Constraint` (`SEQUENCE (SIZE (1..MAX)) OF Type`), so the
 * `Constraint` alternative cannot be dropped. The expensive backtracking was
 * `SEQUENCE {` / `SEQUENCE OF`, which this gate already skips.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * Type ::= BuiltinType | ReferencedType | ConstrainedType
 * ConstrainedType ::= Type Constraint | TypeWithConstraint
 * ```
 *
 * @constant {Parser}
 */
export const Type: Parser = recursiveParser((): Parser => {
  const optionalWhitespace = optional(whitespace);
  const constraintsList = whitespaceOptionalDelimitedList(
    ProductionType.Constraints,
    parserFor.Constraint
  );
  const unconstrainedThenOptionalConstraints = new Parser(
    () => 'Type',
    (state: ParseContext): ParseContext => {
      const type_: ParseContext = UnconstrainedType.execute(state);
      if (type_.error) {
        return type_;
      }
      const ws1 = optionalWhitespace.execute(type_);
      const constraints = constraintsList.execute(ws1);
      if (constraints.error) {
        return type_;
      }
      return {
        ...constraints,
        cst: new Production(
          ProductionType.ConstrainedType,
          [
            {
              // 3F5B84A3-609A-4142-91D3-B3A2FB965F0B
              ...type_,
              cst: new Production(ProductionType.Type, [type_.cst]),
            },
            ws1,
            constraints,
          ].map((c) => c.cst)
        ),
      };
    }
  );
  return choiceOf(
    [
      when(
        isTypeWithConstraintStart,
        aliasFor(ProductionType.ConstrainedType, parserFor.TypeWithConstraint)
      ),
      unconstrainedThenOptionalConstraints,
    ],
    ProductionType.Type
  );
});
export default Type;
