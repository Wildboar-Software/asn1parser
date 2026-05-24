import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import AnyType from '../deprecated/AnyType.mjs';

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
export const BuiltinType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.PrefixedType,
        parserFor.BitStringType,
        parserFor.BooleanType,
        parserFor.CharacterStringType,
        parserFor.ChoiceType,
        parserFor.DateType,
        parserFor.DateTimeType,
        parserFor.DurationType,
        parserFor.EmbeddedPDVType,
        parserFor.EnumeratedType,
        parserFor.ExternalType,
        parserFor.InstanceOfType,
        parserFor.IntegerType,
        parserFor.IRIType,
        parserFor.NullType,
        parserFor.ObjectClassFieldType,
        parserFor.ObjectIdentifierType,
        parserFor.OctetStringType,
        parserFor.RealType,
        parserFor.RelativeIRIType,
        parserFor.RelativeOIDType,
        parserFor.SequenceType,
        parserFor.SequenceOfType,
        parserFor.SetType,
        parserFor.SetOfType,
        parserFor.TimeType,
        parserFor.TimeOfDayType,

        // Retracted, but still supported by this ASN.1 Parser for backwards compatibility.
        AnyType,
      ],
      ProductionType.BuiltinType
    )
);
export default BuiltinType;
