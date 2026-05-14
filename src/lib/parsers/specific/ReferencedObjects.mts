import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
