import { aliasFor, choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ReferencedType ::= DefinedType | UsefulType | SelectionType | TypeFromObject | ValueSetFromObjects`
 */
export const ReferencedType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.UsefulType,
        parserFor.DefinedType,
        parserFor.SelectionType,
        parserFor.TypeFromObject, // `TypeFromObject ::= ReferencedObjects "." FieldName`
        // As you can see, these two productions are completely identical and indiscernible.
        // parserFor.ValueSetFromObjects, // `ValueSetFromObjects ::= ReferencedObjects "." FieldName`
        aliasFor(ProductionType.DefinedType, parserFor.typereference),
      ],
      ProductionType.ReferencedType
    )
);
export default ReferencedType;
