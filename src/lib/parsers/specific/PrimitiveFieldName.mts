import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
