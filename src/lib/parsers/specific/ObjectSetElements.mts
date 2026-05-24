import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectSetElements ::= Object | DefinedObjectSet | ObjectSetFromObjects | ParameterizedObjectSet`
 */
export const ObjectSetElements: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectSetFromObjects, // This should be eclipsed by ObjectFromObject.
        parserFor.Object,
        parserFor.ParameterizedObjectSet,
        parserFor.DefinedObjectSet,
      ],
      ProductionType.ObjectSetElements
    )
);
export default ObjectSetElements;
