import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `InformationFromObjects ::=
 *      ValueFromObject
 *      | ValueSetFromObjects
 *      | TypeFromObject
 *      | ObjectFromObject
 *      | ObjectSetFromObjects`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ValueFromObject,
        parserFor.ValueSetFromObjects,
        parserFor.TypeFromObject,
        parserFor.ObjectFromObject,
        parserFor.ObjectSetFromObjects,
      ],
      ProductionType.InformationFromObjects
    )
);
