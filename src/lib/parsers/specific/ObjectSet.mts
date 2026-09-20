import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

/**
 * Diagnostic shown when an ObjectSet is `{ }`.
 *
 * ITU-T X.681 defines `ObjectSet ::= "{" ObjectSetSpec "}"` and every
 * `ObjectSetSpec` alternative contains either a `RootElementSetSpec` or an
 * extension marker. `{ ... }` is therefore the smallest legal object set.
 */
export const EMPTY_OBJECT_SET_ERROR_MESSAGE =
  'Object sets cannot be empty. Use `{ ... }` to indicate an object set with no root objects.';

/**
 * `ObjectSet ::= "{" ObjectSetSpec "}"`
 */
export const ObjectSet: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSet, [
      literal(ProductionType.curlyOpening),
      parserFor.ObjectSetSpec,
      literal(ProductionType.curlyClosing),
    ])
);

/**
 * Invalid empty object set: `{ }`.
 *
 * This is not part of the `ObjectSet` production itself. Empty braces can be a
 * legal `DefinedSyntax` object, and `ObjectSet` is attempted before `Object`
 * in `ActualParameter`, so treating `{ }` as a successful (error-bearing)
 * `ObjectSet` in the general parser would steal those objects. Use this
 * parser only where an `ObjectSet` is required, such as
 * `ObjectSetAssignment`.
 */
const emptyObjectSetContents: Parser = whitespaceTolerantSequenceOf(
  ProductionType.ObjectSet,
  [
    literal(ProductionType.curlyOpening),
    literal(ProductionType.curlyClosing),
  ]
);

export const EmptyObjectSet: Parser = new Parser(
  () => 'Empty ObjectSet',
  (state: ParseContext): ParseContext => {
    const result = emptyObjectSetContents.execute(state);
    if (result.error) {
      return result;
    }
    const key: number = result.cst.location.startIndex;
    if (!(key in result.syntaxErrors)) {
      result.syntaxErrors[key] = new ASN1SyntaxError(
        result.cst,
        EMPTY_OBJECT_SET_ERROR_MESSAGE
      );
    }
    return result;
  }
);

/**
 * An `ObjectSet` parser for contexts that cannot be a `ValueSet`.
 *
 * Tries a legal `ObjectSet` first, then empty `{ }` so that form can be
 * reported with a descriptive syntax error instead of aborting the
 * surrounding assignment or being stolen by `ValueSetTypeAssignment`.
 */
export const ObjectSetInAssignment: Parser = recursiveParser(
  (): Parser => choiceOf([ObjectSet, EmptyObjectSet])
);

export default ObjectSet;
