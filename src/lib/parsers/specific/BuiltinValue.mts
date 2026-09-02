import {
  aliasFor,
  dispatchOnToken,
  peekNextNonWhitespaceType,
  recursiveParser,
  when,
} from '../generic/index.mjs';
import type { TokenParserTable } from '../generic/dispatchOnToken.mjs';
import { tokenParserTable } from '../generic/dispatchOnToken.mjs';
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
 *
 * Table entries are built inside the `recursiveParser` getter so `parserFor.*`
 * is populated. These modules import each other through `specific/index.mjs`;
 * capturing the parsers at module evaluation would store `undefined`.
 */
export const BuiltinValue: Parser = recursiveParser((): Parser => {
  const characterStringValue = aliasFor(
    ProductionType.CharacterStringValue,
    parserFor.RestrictedCharacterStringValue
  );
  // ChoiceValue ::= identifier ":" Value
  const choiceValue = when(
    (state: ParseContext): boolean =>
      peekNextNonWhitespaceType(state) === ProductionType.colon,
    parserFor.ChoiceValue
  );
  /**
   * `EnumeratedValue ::= identifier` is not dispatched here. That alternative
   * is commented out of `BuiltinValue` so a bare identifier can be a
   * `ReferencedValue` (`valuereference`). When `currentType` is
   * `EnumeratedType`, `Value_listens_to_currentType` selects `EnumeratedValue`.
   *
   * Putting `EnumeratedValue` in this table would accept every identifier as
   * a `BuiltinValue` and starve `ReferencedValue`.
   */
  const table: TokenParserTable = tokenParserTable([
    [
      ProductionType.bstring,
      [parserFor.BitStringValue, parserFor.OctetStringValue],
    ],
    [ProductionType.hstring, parserFor.OctetStringValue],
    [
      ProductionType._CONTAINING,
      [parserFor.BitStringValue, parserFor.OctetStringValue],
    ],
    [ProductionType._TRUE, parserFor.BooleanValue],
    [ProductionType._FALSE, parserFor.BooleanValue],
    [ProductionType.cstring, [characterStringValue, parserFor.IRIValue]],
    [ProductionType.identifier, choiceValue],
    [ProductionType.number, [parserFor.IntegerValue, parserFor.RealValue]],
    [ProductionType.hyphen, [parserFor.IntegerValue, parserFor.RealValue]],
    [ProductionType.realnumber, parserFor.RealValue],
    [ProductionType._NULL, parserFor.NullValue],
    [
      ProductionType.curlyOpening,
      [
        parserFor.BitStringValue,
        parserFor.ObjectIdentifierValue,
        parserFor.RelativeOIDValue,
        parserFor.SequenceValue,
        parserFor.SequenceOfValue,
        parserFor.RealValue,
      ],
    ],
    [ProductionType.quotationMark, parserFor.RelativeIRIValue],
    [ProductionType._PLUS_INFINITY, parserFor.RealValue],
    [ProductionType._MINUS_INFINITY, parserFor.RealValue],
    [ProductionType._NOT_A_NUMBER, parserFor.RealValue],
    [ProductionType.tstring, parserFor.TimeValue],
  ]);
  return dispatchOnToken(table, ProductionType.BuiltinValue);
});
export default BuiltinValue;
