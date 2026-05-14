import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import * as optimizedParserFor from '../optimized/index.js';

/**
 * `ActualParameter ::= Type | Value | ValueSet | DefinedObjectClass | Object | ObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ValueSet, // { ElementSetSpecs }
        parserFor.ObjectSet, // { ObjectSetSpec }
        optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
        parserFor.DefinedObjectClass, // ExternalObjectClassReference | objectclassreference | UsefulObjectClassReference
        parserFor.Type,
        parserFor.Value,
        parserFor.Object, // DefinedObject | ObjectDefn | ObjectFromObject | ParameterizedObject
      ],
      ProductionType.ActualParameter
    )
);
