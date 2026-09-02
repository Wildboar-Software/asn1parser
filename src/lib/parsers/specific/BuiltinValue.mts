import {
  aliasFor,
  dispatchOnToken,
  peekNextNonWhitespaceType,
  recursiveParser,
  when,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `BuiltinValue ::=
 *      BitStringValue
 *      | BooleanValue
 *      | CharacterStringValue
 *      | ChoiceValue
 *      | EmbeddedPDVValue
 *      | EnumeratedValue
 *      | ExternalValue
 *      | InstanceOfValue
 *      | IntegerValue
 *      | IRIValue
 *      | NullValue
 *      | ObjectIdentifierValue
 *      | OctetStringValue
 *      | RealValue
 *      | RelativeIRIValue
 *      | RelativeOIDValue
 *      | SequenceValue
 *      | SequenceOfValue
 *      | SetValue
 *      | SetOfValue
 *      | PrefixedValue
 *      | TimeValue`
 */
export const BuiltinValue: Parser = recursiveParser((): Parser => {
  const characterStringValue = aliasFor(
    ProductionType.CharacterStringValue,
    parserFor.RestrictedCharacterStringValue
  );
  const choiceValue = when(
    (state: ParseContext): boolean =>
      peekNextNonWhitespaceType(state) === ProductionType.colon,
    parserFor.ChoiceValue
  );
  const curlyAlts: Parser[] = [
    parserFor.BitStringValue,
    parserFor.ObjectIdentifierValue,
    parserFor.RelativeOIDValue,
    parserFor.SequenceValue,
    parserFor.SequenceOfValue,
    parserFor.RealValue,
  ];
  return dispatchOnToken(
    {
      [ProductionType.bstring]: [
        parserFor.BitStringValue,
        parserFor.OctetStringValue,
      ],
      [ProductionType.hstring]: parserFor.OctetStringValue,
      [ProductionType._CONTAINING]: [
        parserFor.BitStringValue,
        parserFor.OctetStringValue,
      ],
      [ProductionType._TRUE]: parserFor.BooleanValue,
      [ProductionType._FALSE]: parserFor.BooleanValue,
      [ProductionType.cstring]: [characterStringValue, parserFor.IRIValue],
      [ProductionType.identifier]: choiceValue,
      [ProductionType.number]: [parserFor.IntegerValue, parserFor.RealValue],
      [ProductionType.hyphen]: [parserFor.IntegerValue, parserFor.RealValue],
      [ProductionType.realnumber]: parserFor.RealValue,
      [ProductionType._NULL]: parserFor.NullValue,
      [ProductionType.curlyOpening]: curlyAlts,
      [ProductionType.quotationMark]: parserFor.RelativeIRIValue,
      [ProductionType._PLUS_INFINITY]: parserFor.RealValue,
      [ProductionType._MINUS_INFINITY]: parserFor.RealValue,
      [ProductionType._NOT_A_NUMBER]: parserFor.RealValue,
      [ProductionType.tstring]: parserFor.TimeValue,
    },
    ProductionType.BuiltinValue
  );
});
export default BuiltinValue;
