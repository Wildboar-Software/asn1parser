import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary A variant of `Setting` that only parses alternatives that are
 *  compatible with the capitalization indicated by the field name.
 * @description
 * The variant of `Setting` only parses alternatives that are compatible with
 * the capitalization indicated by the field name in the defined syntax of
 * an object class. For instance, if the field name is `&Errors`, this parser
 * can be used to only parse `Type`, `ValueSet`, and `ObjectSet`, because only
 * those alternatives are compatible with a field whose first letter is
 * capitalized.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```asn1
 * Setting ::= Type | Value | ValueSet | Object | ObjectSet
 * ```
 *
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Type, parserFor.ObjectSet, parserFor.ValueSet],
      ProductionType.Setting
    )
);
