import { dispatchOnToken, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

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
export const RestrictedCharacterStringType: Parser = recursiveParser(
  (): Parser =>
    dispatchOnToken(
      {
        [ProductionType._BMPString]: literal(ProductionType._BMPString),
        [ProductionType._GeneralString]: literal(ProductionType._GeneralString),
        [ProductionType._GraphicString]: literal(ProductionType._GraphicString),
        [ProductionType._IA5String]: literal(ProductionType._IA5String),
        [ProductionType._ISO646String]: literal(ProductionType._ISO646String),
        [ProductionType._NumericString]: literal(ProductionType._NumericString),
        [ProductionType._PrintableString]: literal(
          ProductionType._PrintableString
        ),
        [ProductionType._TeletexString]: literal(ProductionType._TeletexString),
        [ProductionType._T61String]: literal(ProductionType._T61String),
        [ProductionType._UniversalString]: literal(
          ProductionType._UniversalString
        ),
        [ProductionType._UTF8String]: literal(ProductionType._UTF8String),
        [ProductionType._VideotexString]: literal(
          ProductionType._VideotexString
        ),
        [ProductionType._VisibleString]: literal(ProductionType._VisibleString),
      },
      ProductionType.RestrictedCharacterStringType
    )
);
export default RestrictedCharacterStringType;
