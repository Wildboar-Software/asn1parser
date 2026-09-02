import {
  aliasFor,
  canStartOpenTypeFieldVal,
  choiceOf,
  recursiveParser,
  when,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import TypeType from '../../constructs/TypeType.mjs';

const CLEAR_CURRENT_TYPE: ReadonlySet<TypeType> = new Set([
  TypeType.ChoiceType,
  TypeType.SequenceType,
  TypeType.SequenceOfType,
  TypeType.SetType,
  TypeType.SetOfType,
]);

/**
 * @summary `Value` parser that intelligently uses the right alternatives of
 *  `BuiltinValue` depending on the expected `Type`.
 * @description
 * This `Value` parser uses the contextually-determined `Type` to select only
 * type-compatible alternatives of `BuiltinValue`, instead of attempting all of
 * them. Not only does this improve parsing speed, but it also reduces errors
 * by identifying the type of the value correctly the first time.
 *
 * `ObjectClassFieldValue` (`Type ":" Value`) is skipped unless the current
 * token can start an open-type field value.
 *
 * @constant {Parser}
 */
export const Value_listens_to_currentType: Parser = recursiveParser(
  (): Parser => {
    const wrap = (parser: Parser): Parser =>
      aliasFor(ProductionType.BuiltinValue, parser);
    const builtinValueByType = new Map<TypeType, Parser>([
      [TypeType.BitStringType, wrap(parserFor.BitStringValue)],
      [TypeType.BooleanType, wrap(parserFor.BooleanValue)],
      [TypeType.ChoiceType, wrap(parserFor.ChoiceValue)],
      [TypeType.DateType, wrap(parserFor.TimeValue)],
      [TypeType.DateTimeType, wrap(parserFor.TimeValue)],
      [TypeType.DurationType, wrap(parserFor.TimeValue)],
      [TypeType.EmbeddedPDVType, wrap(parserFor.EmbeddedPDVValue)],
      [TypeType.EnumeratedType, wrap(parserFor.EnumeratedValue)],
      [TypeType.ExternalType, wrap(parserFor.ExternalValue)],
      [TypeType.IntegerType, wrap(parserFor.IntegerValue)],
      [TypeType.IRIType, wrap(parserFor.IRIValue)],
      [TypeType.NullType, wrap(parserFor.NullValue)],
      [TypeType.ObjectIdentifierType, wrap(parserFor.ObjectIdentifierValue)],
      [TypeType.OctetStringType, wrap(parserFor.OctetStringValue)],
      [TypeType.RealType, wrap(parserFor.RealValue)],
      [TypeType.RelativeIRIType, wrap(parserFor.RelativeIRIValue)],
      [TypeType.RelativeOIDType, wrap(parserFor.RelativeOIDValue)],
      [TypeType.SequenceType, wrap(parserFor.SequenceValue)],
      [TypeType.SequenceOfType, wrap(parserFor.SequenceOfValue)],
      [TypeType.SetType, wrap(parserFor.SetValue)],
      [TypeType.SetOfType, wrap(parserFor.SetOfValue)],
      [TypeType.TimeType, wrap(parserFor.TimeValue)],
      [TypeType.TimeOfDayType, wrap(parserFor.TimeValue)],
    ]);
    const specializedBuiltin = new Parser(
      () => 'BuiltinValue (that listens to currentType)',
      (state: ParseContext): ParseContext => {
        const currentType = state.currentType;
        if (currentType === undefined) {
          return parserFor.BuiltinValue.execute(state);
        }
        const specialized = builtinValueByType.get(currentType);
        if (!specialized) {
          return parserFor.BuiltinValue.execute(state);
        }
        if (CLEAR_CURRENT_TYPE.has(currentType)) {
          state.currentType = undefined;
        }
        return specialized.execute(state);
      }
    );
    return choiceOf(
      [
        when(canStartOpenTypeFieldVal, parserFor.ObjectClassFieldValue),
        specializedBuiltin,
        parserFor.ReferencedValue,
      ],
      ProductionType.Value
    );
  }
);
export default Value_listens_to_currentType;
