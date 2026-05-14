import { aliasFor, choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ReferencedType ::= DefinedType | UsefulType | SelectionType | TypeFromObject | ValueSetFromObjects`
 */
export default recursiveParser(
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
