import {
  aliasFor,
  literal,
  optional,
  recursiveParser,
  whitespace,
  recyclingSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import ElementSetSpec from './ElementSetSpec_Subtype.js';

const RootElementSetSpec = recursiveParser(
  (): Parser => aliasFor(ProductionType.RootElementSetSpec, ElementSetSpec)
);

const AdditionalElementSetSpec = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.AdditionalElementSetSpec, ElementSetSpec)
);

/**
 * @summary `ElementSetSpecs` parser that only parses `SubtypeElements`
 * @description
 * This parser efficiently parses `ElementSetSpecs` by avoiding re-parsing
 * `RootElementSetSpec` for each alternative attempted. In addition to this,
 * it also only calls an `ElementSetSpec` parser that only parsers `Elements`
 * alternatives that a compatible with subtype constraints and value sets, since
 * those are the only places where the `ElementSetSpecs` production is used.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * ElementSetSpecs ::=
 *      RootElementSetSpec
 *      | RootElementSetSpec "," "..."
 *      | RootElementSetSpec "," "..." "," AdditionalElementSetSpec
 * ```
 *
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    recyclingSequenceOf(
      ProductionType.ElementSetSpecs,
      [RootElementSetSpec],
      [
        optional(whitespace),
        literal(ProductionType.comma),
        optional(whitespace),
        parserFor.ellipsis,
      ],
      [
        optional(whitespace),
        literal(ProductionType.comma),
        optional(whitespace),
        AdditionalElementSetSpec,
      ]
    )
);
