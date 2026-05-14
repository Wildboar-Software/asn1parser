import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ReferencedObjects ::= DefinedObject | ParameterizedObject | DefinedObjectSet | ParameterizedObjectSet`
 * `DefinedObject ::= ExternalObjectReference | objectreference`
 * `DefinedObjectSet ::= ExternalObjectSetReference | objectsetreference`
 * `ParameterizedObject ::= DefinedObject ActualParameterList`
 * `ParameterizedObjectSet ::= DefinedObjectSet ActualParameterList`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedObject,
        parserFor.DefinedObject,
        parserFor.ParameterizedObjectSet,
        parserFor.DefinedObjectSet,
      ],
      ProductionType.ReferencedObjects
    )
);
