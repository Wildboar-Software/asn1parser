import {
  dispatchOnToken,
  literal,
  recursiveParser,
  RESTRICTED_CHARACTER_STRING_TYPES,
} from '../generic/index.mjs';
import type { TokenParserTable } from '../generic/dispatchOnToken.mjs';
import { tokenParserTable } from '../generic/dispatchOnToken.mjs';
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
  (): Parser => {
    const table: TokenParserTable = tokenParserTable(
      RESTRICTED_CHARACTER_STRING_TYPES.map((type) => [type, literal(type)])
    );
    return dispatchOnToken(
      table,
      ProductionType.RestrictedCharacterStringType
    );
  }
);
export default RestrictedCharacterStringType;
