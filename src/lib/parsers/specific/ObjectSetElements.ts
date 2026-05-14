import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectSetElements ::= Object | DefinedObjectSet | ObjectSetFromObjects | ParameterizedObjectSet`
 */
export default recursiveParser(
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
