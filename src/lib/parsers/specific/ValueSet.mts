import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ElementSetSpecs from '../optimized/ElementSetSpecs_Subtype.mjs';
import ellipsis from './_ellipsis.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

/**
 * Diagnostic shown when a ValueSet is `{ }` or `{ ... }`.
 *
 * ITU-T X.680 defines `ValueSet ::= "{" ElementSetSpecs "}"` and
 * `ElementSetSpecs` always begins with a `RootElementSetSpec`. A bare
 * extension marker is valid for an object set (`ObjectSetSpec` includes
 * `"..."`), but not for a value set.
 */
export const EMPTY_VALUE_SET_ERROR_MESSAGE =
  'Value sets cannot be empty. `{ ... }` is valid for an object set, but a ValueSet requires a RootElementSetSpec before any extension marker.';

/**
 * `ValueSet ::= "{" ElementSetSpecs "}"`
 */
export const ValueSet: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueSet, [
      literal(ProductionType.curlyOpening),
      ElementSetSpecs,
      literal(ProductionType.curlyClosing),
    ])
);

/**
 * Invalid empty value sets: `{ }` and `{ ... }`.
 *
 * This is not part of the `ValueSet` production itself. `{ ... }` is a
 * legal `ObjectSet`, and `ValueSet` is attempted before `ObjectSet` in
 * `ActualParameter` and `Setting`, so treating this form as a successful
 * (error-bearing) `ValueSet` in the general parser would steal those
 * object sets. Use this parser only where a `ValueSet` is required, such
 * as `ValueSetTypeAssignment`.
 */
const emptyValueSetContents: Parser = choiceOf([
  whitespaceTolerantSequenceOf(ProductionType.ValueSet, [
    literal(ProductionType.curlyOpening),
    ellipsis,
    literal(ProductionType.curlyClosing),
  ]),
  whitespaceTolerantSequenceOf(ProductionType.ValueSet, [
    literal(ProductionType.curlyOpening),
    literal(ProductionType.curlyClosing),
  ]),
]);

export const EmptyValueSet: Parser = new Parser(
  () => 'Empty ValueSet',
  (state: ParseContext): ParseContext => {
    const result = emptyValueSetContents.execute(state);
    if (result.error) {
      return result;
    }
    const key: number = result.cst.location.startIndex;
    if (!(key in result.syntaxErrors)) {
      result.syntaxErrors[key] = new ASN1SyntaxError(
        result.cst,
        EMPTY_VALUE_SET_ERROR_MESSAGE
      );
    }
    return result;
  }
);

/**
 * A `ValueSet` parser for contexts that cannot be an `ObjectSet`.
 *
 * Tries a legal `ValueSet` first, then the empty `{ }` / `{ ... }` forms
 * so those can be reported with a descriptive syntax error instead of
 * aborting the surrounding assignment.
 */
export const ValueSetInAssignment: Parser = recursiveParser(
  (): Parser => choiceOf([ValueSet, EmptyValueSet])
);

export default ValueSet;
