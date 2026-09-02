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
import typeTypeToValueParserMap from '../../maps/typeTypeToValueParserMap.mjs';

/**
 * Constructed values contain nested `Value` parsers. Those inner values must
 * not inherit this type or `{}` is forced to `SequenceValue`, `ident : x` is
 * forced to `ChoiceValue`, and so on. Scalar values do not recurse into
 * `Value`, so `currentType` can stay until `onDidParseValue` clears it.
 */
const CLEAR_CURRENT_TYPE: ReadonlySet<TypeType> = new Set([
  TypeType.ChoiceType,
  TypeType.SequenceType,
  TypeType.SequenceOfType,
  TypeType.SetType,
  TypeType.SetOfType,
]);

/**
 * InstanceOfValue is an alias for Value (infinite loop if selected here).
 * ObjectClassFieldValue is already the first alternative of this parser.
 */
const SKIP_TYPE_SPECIFIC_BUILTIN_VALUE: ReadonlySet<TypeType> = new Set([
  TypeType.InstanceOfType,
  TypeType.ObjectClassFieldType,
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
 * Type-specific `BuiltinValue` wrappers are built from
 * `typeTypeToValueParserMap` once the circular `parserFor` graph has loaded.
 *
 * @constant {Parser}
 */
export const Value_listens_to_currentType: Parser = recursiveParser(
  (): Parser => {
    const builtinValueByType = new Map<TypeType, Parser>();
    for (const [typeType, valueParser] of typeTypeToValueParserMap) {
      if (SKIP_TYPE_SPECIFIC_BUILTIN_VALUE.has(typeType)) {
        continue;
      }
      builtinValueByType.set(
        typeType,
        aliasFor(ProductionType.BuiltinValue, valueParser)
      );
    }
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
        // Clear before execute so nested Value parsers (see CLEAR_CURRENT_TYPE)
        // do not inherit the parent type. Do not wait for success: the nested
        // values run during this execute. onDidParseValue still clears after
        // the outer Value succeeds.
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
