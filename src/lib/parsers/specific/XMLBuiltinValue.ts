import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLBuiltinValue ::=
 *      XMLBitStringValue
 *      | XMLBooleanValue
 *      | XMLCharacterStringValue
 *      | XMLChoiceValue
 *      | XMLEmbeddedPDVValue
 *      | XMLEnumeratedValue
 *      | XMLExternalValue
 *      | XMLInstanceOfValue
 *      | XMLIntegerValue
 *      | XMLIRIValue
 *      | XMLNullValue
 *      | XMLObjectIdentifierValue
 *      | XMLOctetStringValue
 *      | XMLRealValue
 *      | XMLRelativeIRIValue
 *      | XMLRelativeOIDValue
 *      | XMLSequenceValue
 *      | XMLSequenceOfValue
 *      | XMLSetValue
 *      | XMLSetOfValue
 *      | XMLPrefixedValue
 *      | XMLTimeValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.XMLBitStringValue,
        parserFor.XMLBooleanValue,
        parserFor.XMLCharacterStringValue,
        parserFor.XMLChoiceValue,
        parserFor.XMLEmbeddedPDVValue,
        parserFor.XMLEnumeratedValue,
        parserFor.XMLExternalValue,
        parserFor.XMLInstanceOfValue,
        parserFor.XMLIntegerValue,
        parserFor.XMLIRIValue,
        parserFor.XMLNullValue,
        parserFor.XMLObjectIdentifierValue,
        parserFor.XMLOctetStringValue,
        parserFor.XMLRealValue,
        parserFor.XMLRelativeIRIValue,
        parserFor.XMLRelativeOIDValue,
        parserFor.XMLSequenceValue,
        parserFor.XMLSequenceOfValue,
        parserFor.XMLSetValue,
        parserFor.XMLSetOfValue,
        parserFor.XMLPrefixedValue,
        parserFor.XMLTimeValue,
      ],
      ProductionType.XMLBuiltinValue
    )
);
