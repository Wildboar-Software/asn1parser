import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PrimitiveFieldName ::=
 *      typefieldreference
 *      | valuefieldreference
 *      | valuesetfieldreference
 *      | objectfieldreference
 *      | objectsetfieldreference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.typefieldreference,
        parserFor.valuefieldreference,
        parserFor.valuesetfieldreference,
        parserFor.objectfieldreference,
        parserFor.objectsetfieldreference,
      ],
      ProductionType.PrimitiveFieldName
    )
);
