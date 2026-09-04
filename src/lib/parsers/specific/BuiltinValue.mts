import {
  aliasFor,
  dispatchOnToken,
  failParse,
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
import TypeType from '../../constructs/TypeType.mjs';

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
  /**
   * Several value productions start with `{`, and without a type they overlap:
   *
   * - `{}` is an empty BIT STRING, SEQUENCE, SET, SEQUENCE OF, or SET OF
   * - `{ a 1 }` is an OBJECT IDENTIFIER (NameForm + NumberForm) and also a
   *   SEQUENCE/SET named-value list
   *
   * `Value_listens_to_currentType` usually picks one parser before this table
   * runs. This `{` handler still looks at `currentType` so a typed
   * `BuiltinValue` does not try BIT STRING / OID first. When the type is
   * unknown, BIT STRING and OID stay first so `{ iso 1 }` and `{}` BIT STRING
   * values keep parsing; SEQUENCE/SET/OF follow, including SetValue/SetOfValue
   * which were previously omitted.
   */
  const curlyValueByType: Map<string, Parser> = new Map([
    [TypeType.BitStringType, parserFor.BitStringValue],
    [TypeType.ObjectIdentifierType, parserFor.ObjectIdentifierValue],
    [TypeType.RelativeOIDType, parserFor.RelativeOIDValue],
    [TypeType.SequenceType, parserFor.SequenceValue],
    [TypeType.SequenceOfType, parserFor.SequenceOfValue],
    [TypeType.SetType, parserFor.SetValue],
    [TypeType.SetOfType, parserFor.SetOfValue],
    [TypeType.RealType, parserFor.RealValue],
  ]);
  const untypedCurlyValues: Parser[] = [
    parserFor.BitStringValue,
    parserFor.ObjectIdentifierValue,
    parserFor.RelativeOIDValue,
    parserFor.SequenceValue,
    parserFor.SequenceOfValue,
    parserFor.SetValue,
    parserFor.SetOfValue,
    parserFor.RealValue,
  ];
  const curlyOpeningValue: Parser = new Parser(
    () => 'BuiltinValue starting with {',
    (state: ParseContext): ParseContext => {
      const typed: Parser | undefined = state.currentType
        ? curlyValueByType.get(state.currentType)
        : undefined;
      const alts: Parser[] = typed ? [typed] : untypedCurlyValues;
      for (const alt of alts) {
        const result: ParseContext = alt.execute(state);
        if (!result.error) {
          return result;
        }
      }
      return failParse(state, ProductionType.BuiltinValue);
    }
  );
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
    [ProductionType.curlyOpening, curlyOpeningValue],
    [ProductionType.quotationMark, parserFor.RelativeIRIValue],
    [ProductionType._PLUS_INFINITY, parserFor.RealValue],
    [ProductionType._MINUS_INFINITY, parserFor.RealValue],
    [ProductionType._NOT_A_NUMBER, parserFor.RealValue],
    [ProductionType.tstring, parserFor.TimeValue],
  ]);
  return dispatchOnToken(table, ProductionType.BuiltinValue);
});
export default BuiltinValue;
