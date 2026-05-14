import { choiceOf, aliasFor } from '../generic/index.js';
import ProductionType from '../../ProductionType.js';
import Parser from '../../Parser.js';
import typeTypeToValueParserMap from '../../maps/typeTypeToValueParserMap.js';
import * as parserFor from '../specific/index.js';
import TypeType from '../../constructs/TypeType.js';

/**
 * @summary Parse a `Value` according to the expected ASN.1 type.
 * @description
 * This parser factory returns a `Parser` that will intelligently use the
 * ASN.1 data type indicated by `typeType` to select the right parsers to try
 * to parse a `Value`.
 *
 * This is important, because in ASN.1, several values of different types are
 * syntatically indistinguishable. For example, an empty pair of curly brackets,
 * `{}` could be a value of any of these types (inclusively):
 *
 * - `BIT STRING`
 * - `OCTET STRING`
 * - `SET OF`
 * - `SEQUENCE OF`
 * - `SET`
 * - `SEQUENCE`
 * - `CharacterString`
 *
 * For that reason, it is critical to intelligently parse according to the
 * expected data type.
 *
 * @param {TypeType} typeType The ASN.1 type that will be used to determine what
 *  parsers to use to attempt to parse a `Value`.
 * @returns {Parser} A `Parser` that will intelligently use only type-compatible
 *  parsers to parse a `Value`.
 * @function
 */
export default function (typeType: TypeType): Parser {
  const typeSpecificParser = typeTypeToValueParserMap.get(typeType);
  return typeSpecificParser
    ? choiceOf(
        [
          parserFor.ObjectClassFieldValue,
          aliasFor(ProductionType.BuiltinValue, typeSpecificParser),
          parserFor.ReferencedValue,
        ],
        ProductionType.Value
      )
    : choiceOf(
        [parserFor.ObjectClassFieldValue, parserFor.ReferencedValue],
        ProductionType.Value
      );
}
