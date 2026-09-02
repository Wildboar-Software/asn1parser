import { dispatchOnToken, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `CharacterStringType ::= RestrictedCharacterStringType | UnrestrictedCharacterStringType`
 */
export const CharacterStringType: Parser = recursiveParser(
  (): Parser =>
    dispatchOnToken(
      {
        [ProductionType._BMPString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._GeneralString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._GraphicString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._IA5String]: parserFor.RestrictedCharacterStringType,
        [ProductionType._ISO646String]: parserFor.RestrictedCharacterStringType,
        [ProductionType._NumericString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._PrintableString]:
          parserFor.RestrictedCharacterStringType,
        [ProductionType._TeletexString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._T61String]: parserFor.RestrictedCharacterStringType,
        [ProductionType._UniversalString]:
          parserFor.RestrictedCharacterStringType,
        [ProductionType._UTF8String]: parserFor.RestrictedCharacterStringType,
        [ProductionType._VideotexString]:
          parserFor.RestrictedCharacterStringType,
        [ProductionType._VisibleString]: parserFor.RestrictedCharacterStringType,
        [ProductionType._CHARACTER]: parserFor.UnrestrictedCharacterStringType,
      },
      ProductionType.CharacterStringType
    )
);
export default CharacterStringType;
