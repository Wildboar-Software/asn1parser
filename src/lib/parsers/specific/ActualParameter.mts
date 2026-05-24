import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import * as optimizedParserFor from '../optimized/index.mjs';

/**
 * `ActualParameter ::= Type | Value | ValueSet | DefinedObjectClass | Object | ObjectSet`
 */
export const ActualParameter: Parser = recursiveParser(
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
export default ActualParameter;
