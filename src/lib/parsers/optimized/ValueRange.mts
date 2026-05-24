import {
  aliasFor,
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Value ::= BuiltinValue | ReferencedValue | ObjectClassFieldValue`
 */
const Value = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        aliasFor(ProductionType.BuiltinValue, parserFor.IntegerValue),
        parserFor.ObjectClassFieldValue, // Only used here.
        parserFor.BuiltinValue,
        parserFor.ReferencedValue,
      ],
      ProductionType.Value
    )
);

/**
 * `LowerEndValue ::= Value | MIN`
 */
const LowerEndValue = recursiveParser(
  (): Parser =>
    choiceOf(
      [Value, literal(ProductionType._MIN)],
      ProductionType.LowerEndValue
    )
);

/**
 * `UpperEndValue ::= Value | MAX`
 */
const UpperEndValue = recursiveParser(
  (): Parser =>
    choiceOf(
      [Value, literal(ProductionType._MAX)],
      ProductionType.UpperEndValue
    )
);

/**
 * `LowerEndpoint ::= LowerEndValue | LowerEndValue "<"`
 */
const LowerEndpoint = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.LowerEndpoint, [
        LowerEndValue,
        literal(ProductionType.lessThan),
      ]),
      aliasFor(ProductionType.LowerEndpoint, LowerEndValue),
    ])
);

/**
 * `UpperEndpoint ::= UpperEndValue | "<" UpperEndValue`
 */
const UpperEndpoint = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.UpperEndpoint, [
        literal(ProductionType.lessThan),
        assert(UpperEndValue, anything, 'FA0422E4-4D59-4D4F-B2D6-04D6B72B07C2'),
      ]),
      aliasFor(ProductionType.UpperEndpoint, UpperEndValue),
    ])
);

/**
 * @summary Efficient `ValueRange` parser that guesses `IntegerValue`s for the
 *  endpoints first.
 * @description
 * This optimized parser guesses `INTEGER` values first, since that is where
 * `ValueRange` is most often used.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * ValueRange ::= LowerEndpoint ".." UpperEndpoint
 * ```
 *
 * @constant {Parser}
 */
export const ValueRange: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueRange, [
      LowerEndpoint,
      parserFor.rangeseparator,
      UpperEndpoint,
    ])
);
export default ValueRange;
