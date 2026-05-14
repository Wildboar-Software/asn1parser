import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import AnyType from '../deprecated/AnyType.js';

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
export default recursiveParser(
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
