import {
  aliasFor,
  dispatchOnToken,
  failParse,
  peekNextNonWhitespaceType,
  recursiveParser,
} from '../generic/index.mjs';
import type { TokenParserTable } from '../generic/dispatchOnToken.mjs';
import { tokenParserTable } from '../generic/dispatchOnToken.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `ReferencedType ::= DefinedType | UsefulType | SelectionType | TypeFromObject | ValueSetFromObjects`
 */
export const ReferencedType: Parser = recursiveParser((): Parser => {
  const definedTypeAlias = aliasFor(
    ProductionType.DefinedType,
    parserFor.typereference
  );
  const fromTypeReference = new Parser(
    () => 'ReferencedType from typereference',
    (state: ParseContext): ParseContext => {
      const next = peekNextNonWhitespaceType(state);
      // "{" → ParameterizedType; "." → ExternalTypeReference. Both live under
      // DefinedType. If that fails, TypeFromObject (ReferencedObjects "." FieldName).
      if (
        next === ProductionType.curlyOpening ||
        next === ProductionType.period
      ) {
        const defined = parserFor.DefinedType.execute(state);
        if (!defined.error) {
          return defined;
        }
        return parserFor.TypeFromObject.execute(state);
      }
      return definedTypeAlias.execute(state);
    }
  );
  const fromIdentifier = new Parser(
    () => 'ReferencedType from identifier',
    (state: ParseContext): ParseContext => {
      const next = peekNextNonWhitespaceType(state);
      if (next === ProductionType.lessThan) {
        return parserFor.SelectionType.execute(state);
      }
      if (
        next === ProductionType.period ||
        next === ProductionType.curlyOpening
      ) {
        return parserFor.TypeFromObject.execute(state);
      }
      return failParse(state);
    }
  );
  const table: TokenParserTable = tokenParserTable([
    [ProductionType._UTCTime, parserFor.UsefulType],
    [ProductionType._GeneralizedTime, parserFor.UsefulType],
    [ProductionType._ObjectDescriptor, parserFor.UsefulType],
    [ProductionType.identifier, fromIdentifier],
    [ProductionType.typereference, fromTypeReference],
    [ProductionType.objectclassreference, fromTypeReference],
  ]);
  return dispatchOnToken(table, ProductionType.ReferencedType);
});
export default ReferencedType;
