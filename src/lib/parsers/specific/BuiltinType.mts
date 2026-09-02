import {
  dispatchOnToken,
  failParse,
  peekNextNonWhitespaceType,
  recursiveParser,
  RESTRICTED_CHARACTER_STRING_TYPES,
  when,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import AnyType from '../deprecated/AnyType.mjs';

function sequenceOrSetBuiltin(
  ofParser: Parser,
  bracedParser: Parser
): Parser {
  return new Parser(
    () => ofParser.name(),
    (state: ParseContext): ParseContext => {
      const next = peekNextNonWhitespaceType(state);
      if (next === ProductionType._OF) {
        return ofParser.execute(state);
      }
      if (next === ProductionType.curlyOpening) {
        return bracedParser.execute(state);
      }
      return failParse(state);
    }
  );
}

/**
 * `BuiltinType ::=
 *      BitStringType
 *      | BooleanType
 *      | CharacterStringType
 *      | ChoiceType
 *      | DateType
 *      | DateTimeType
 *      | DurationType
 *      | EmbeddedPDVType
 *      | EnumeratedType
 *      | ExternalType
 *      | InstanceOfType
 *      | IntegerType
 *      | IRIType
 *      | NullType
 *      | ObjectClassFieldType
 *      | ObjectIdentifierType
 *      | OctetStringType
 *      | RealType
 *      | RelativeIRIType
 *      | RelativeOIDType
 *      | SequenceType
 *      | SequenceOfType
 *      | SetType
 *      | SetOfType
 *      | PrefixedType
 *      | TimeType
 *      | TimeOfDayType`
 */
export const BuiltinType: Parser = recursiveParser((): Parser => {
  const objectClassFieldType = when(
    (state: ParseContext): boolean =>
      peekNextNonWhitespaceType(state) === ProductionType.period,
    parserFor.ObjectClassFieldType
  );
  const characterStringByToken: Record<string, Parser> = {
    [ProductionType._CHARACTER]: parserFor.CharacterStringType,
  };
  for (const type of RESTRICTED_CHARACTER_STRING_TYPES) {
    characterStringByToken[type] = parserFor.CharacterStringType;
  }
  return dispatchOnToken(
    {
      [ProductionType.squareOpening]: parserFor.PrefixedType,
      [ProductionType._BIT]: parserFor.BitStringType,
      [ProductionType._BOOLEAN]: parserFor.BooleanType,
      ...characterStringByToken,
      [ProductionType._CHOICE]: parserFor.ChoiceType,
      [ProductionType._DATE]: parserFor.DateType,
      [ProductionType._DATE_TIME]: parserFor.DateTimeType,
      [ProductionType._DURATION]: parserFor.DurationType,
      [ProductionType._EMBEDDED]: parserFor.EmbeddedPDVType,
      [ProductionType._ENUMERATED]: parserFor.EnumeratedType,
      [ProductionType._EXTERNAL]: parserFor.ExternalType,
      [ProductionType._INSTANCE]: parserFor.InstanceOfType,
      [ProductionType._INTEGER]: parserFor.IntegerType,
      [ProductionType._OID_IRI]: parserFor.IRIType,
      [ProductionType._NULL]: parserFor.NullType,
      [ProductionType.typereference]: objectClassFieldType,
      [ProductionType.objectclassreference]: objectClassFieldType,
      [ProductionType._TYPE_IDENTIFIER]: objectClassFieldType,
      [ProductionType._ABSTRACT_SYNTAX]: objectClassFieldType,
      [ProductionType._OBJECT]: parserFor.ObjectIdentifierType,
      [ProductionType._OCTET]: parserFor.OctetStringType,
      [ProductionType._REAL]: parserFor.RealType,
      [ProductionType._RELATIVE_OID_IRI]: parserFor.RelativeIRIType,
      [ProductionType._RELATIVE_OID]: parserFor.RelativeOIDType,
      [ProductionType._SEQUENCE]: sequenceOrSetBuiltin(
        parserFor.SequenceOfType,
        parserFor.SequenceType
      ),
      [ProductionType._SET]: sequenceOrSetBuiltin(
        parserFor.SetOfType,
        parserFor.SetType
      ),
      [ProductionType._TIME]: parserFor.TimeType,
      [ProductionType._TIME_OF_DAY]: parserFor.TimeOfDayType,
      [ProductionType._ANY]: AnyType,
    },
    ProductionType.BuiltinType
  );
});
export default BuiltinType;
