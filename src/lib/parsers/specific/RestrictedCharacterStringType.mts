import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RestrictedCharacterStringType ::=
 *      BMPString
 *      | GeneralString
 *      | GraphicString
 *      | IA5String
 *      | ISO646String
 *      | NumericString
 *      | PrintableString
 *      | TeletexString
 *      | T61String
 *      | UniversalString
 *      | UTF8String
 *      | VideotexString
 *      | VisibleString`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType._BMPString),
        literal(ProductionType._GeneralString),
        literal(ProductionType._GraphicString),
        literal(ProductionType._IA5String),
        literal(ProductionType._ISO646String),
        literal(ProductionType._NumericString),
        literal(ProductionType._PrintableString),
        literal(ProductionType._TeletexString),
        literal(ProductionType._T61String),
        literal(ProductionType._UniversalString),
        literal(ProductionType._UTF8String),
        literal(ProductionType._VideotexString),
        literal(ProductionType._VisibleString),
      ],
      ProductionType.RestrictedCharacterStringType
    )
);
