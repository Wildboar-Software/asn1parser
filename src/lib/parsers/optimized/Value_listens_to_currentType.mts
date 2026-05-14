import { choiceOf, recursiveParser, aliasFor } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import TypeType from '../../constructs/TypeType.js';

/**
 * @summary `Value` parser that intelligently uses the right alternatives of
 *  `BuiltinValue` depending on the expected `Type`.
 * @description
 * This `Value` parser uses the contextually-determined `Type` to select only
 * type-compatible alternatives of `BuiltinValue`, instead of attempting all of
 * them. Not only does this improve parsing speed, but it also reduces errors
 * by identifying the type of the value correctly the first time.
 *
 * ```abnf
 * Value ::= BuiltinValue | ReferencedValue | ObjectClassFieldValue
 * BuiltinType ::=
 *     BitStringType
 *     | BooleanType
 *     | CharacterStringType
 *     | ChoiceType
 *     | DateType
 *     | DateTimeType
 *     | DurationType
 *     | EmbeddedPDVType
 *     | EnumeratedType
 *     | ExternalType
 *     | InstanceOfType
 *     | IntegerType
 *     | IRIType
 *     | NullType
 *     | ObjectClassFieldType
 *     | ObjectIdentifierType
 *     | OctetStringType
 *     | RealType
 *     | RelativeIRIType
 *     | RelativeOIDType
 *     | SequenceType
 *     | SequenceOfType
 *     | SetType
 *     | SetOfType
 *     | PrefixedType
 *     | TimeType
 *     | TimeOfDayType
 * ```
 *
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectClassFieldValue,
        new Parser(
          () => 'BuiltinValue (that listens to currentType)',
          (state: ParseContext): ParseContext => {
            let valueParser: Parser = parserFor.BuiltinValue;
            switch (state.currentType) {
              case TypeType.BitStringType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.BitStringValue
                );
                break;
              }
              case TypeType.BooleanType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.BooleanValue
                );
                break;
              }
              // case (TypeType.CharacterStringType): {
              //     break;
              // }
              case TypeType.ChoiceType: {
                state.currentType = undefined;
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.ChoiceValue
                );
                break;
              }
              case TypeType.DateType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.TimeValue
                );
                break;
              }
              case TypeType.DateTimeType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.TimeValue
                );
                break;
              }
              case TypeType.DurationType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.TimeValue
                );
                break;
              }
              case TypeType.EmbeddedPDVType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.EmbeddedPDVValue
                );
                break;
              }
              case TypeType.EnumeratedType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.EnumeratedValue
                );
                break;
              }
              case TypeType.ExternalType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.ExternalValue
                );
                break;
              }
              // case (TypeType.InstanceOfType): {
              //     valueParser = aliasFor(ProductionType.BuiltinValue, parserFor.InstanceOfValue);
              //     break;
              // }
              case TypeType.IntegerType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.IntegerValue
                );
                break;
              }
              case TypeType.IRIType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.IRIValue
                );
                break;
              }
              case TypeType.NullType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.NullValue
                );
                break;
              }
              // case (TypeType.ObjectClassFieldType): {
              //     valueParser = aliasFor(ProductionType.BuiltinValue, parserFor.ObjectClassFieldValue);
              //     break;
              // }
              case TypeType.ObjectIdentifierType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.ObjectIdentifierValue
                );
                break;
              }
              case TypeType.OctetStringType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.OctetStringValue
                );
                break;
              }
              case TypeType.RealType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.RealValue
                );
                break;
              }
              case TypeType.RelativeIRIType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.RelativeIRIValue
                );
                break;
              }
              case TypeType.RelativeOIDType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.RelativeOIDValue
                );
                break;
              }
              case TypeType.SequenceType: {
                state.currentType = undefined;
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.SequenceValue
                );
                break;
              }
              case TypeType.SequenceOfType: {
                state.currentType = undefined;
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.SequenceOfValue
                );
                break;
              }
              case TypeType.SetType: {
                state.currentType = undefined;
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.SetValue
                );
                break;
              }
              case TypeType.SetOfType: {
                state.currentType = undefined;
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.SetOfValue
                );
                break;
              }
              // case (TypeType.PrefixedType): {
              //     valueParser = aliasFor(ProductionType.BuiltinValue, parserFor.BooleanValue);
              //     break;
              // }
              case TypeType.TimeType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.TimeValue
                );
                break;
              }
              case TypeType.TimeOfDayType: {
                valueParser = aliasFor(
                  ProductionType.BuiltinValue,
                  parserFor.TimeValue
                );
                break;
              }
              default: {
                return parserFor.BuiltinValue.execute(state);
              }
            }
            return valueParser.execute(state);
          }
        ),
        parserFor.ReferencedValue,
      ],
      ProductionType.Value
    )
);
