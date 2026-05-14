import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Object ::= DefinedObject | ObjectDefn | ObjectFromObject | ParameterizedObject`
 * `ObjectDefn ::= DefaultSyntax | DefinedSyntax (Both are very similar)`
 * `ObjectFromObject ::= ReferencedObjects "." FieldName`
 * `ReferencedObjects ::= DefinedObject | ParameterizedObject | DefinedObjectSet | ParameterizedObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectFromObject, // Must be first, because it could start with `DefinedObject` or `ParameterizedObject`.
        parserFor.ParameterizedObject, // Must be second, as it is a subset of DefinedObject
        parserFor.DefinedObject,
        parserFor.ObjectDefn,
      ],
      ProductionType.Object
    )
);
