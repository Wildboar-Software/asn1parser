import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
