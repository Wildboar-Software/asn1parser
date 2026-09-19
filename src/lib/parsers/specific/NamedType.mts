import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';
import { ANCIENT_NAMELESS_NAMED_TYPE_ERROR_MESSAGE } from '../../ancientNamelessNamedType.mjs';

/**
 * `NamedType ::= identifier Type`
 */
export const NamedType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedType, [
      literal(ProductionType.identifier),
      parserFor.Type,
    ])
);

/**
 * `NamedType` for SEQUENCE/SET components and CHOICE alternatives.
 *
 * If the identifier is missing but a `Type` is present, this records a
 * descriptive syntax error for the ancient nameless-component form instead of
 * failing the surrounding constructed type (which previously crashed while
 * recovering).
 *
 * Do not use this where a bare `Type` is a legal alternative of `NamedType`,
 * such as `SEQUENCE OF Type` / `SET OF Type` / `TypeWithConstraint`.
 */
export const NamedTypeRequiringIdentifier: Parser = new Parser(
  () => 'NamedType',
  (state: ParseContext): ParseContext => {
    const nt: ParseContext = NamedType.execute(state);
    if (!nt.error) {
      return nt;
    }
    const typeAttempt: ParseContext = parserFor.Type.execute(state);
    if (typeAttempt.error) {
      return nt;
    }
    const key: number = typeAttempt.cst.location.startIndex;
    if (!(key in typeAttempt.syntaxErrors)) {
      typeAttempt.syntaxErrors[key] = new ASN1SyntaxError(
        typeAttempt.cst,
        ANCIENT_NAMELESS_NAMED_TYPE_ERROR_MESSAGE,
      );
    }
    return {
      ...typeAttempt,
      cst: new Production(ProductionType.NamedType, [typeAttempt.cst]),
    };
  }
);

export default NamedType;
