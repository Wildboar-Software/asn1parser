import { ASN1UniversalType } from "asn1-ts";
import TypeType from '../constructs/TypeType.js';

/**
 * @summary A mapping of ASN.1 data types to tag numbers.
 * @constant
 */
export default new Map<TypeType, ASN1UniversalType>([
  [TypeType.BitStringType, ASN1UniversalType.bitString],
  [TypeType.BooleanType, ASN1UniversalType.boolean],
  // [ TypeType.CharacterStringType, ASN1UniversalType. ],
  // [ TypeType.ChoiceType, ASN1UniversalType ],
  [TypeType.DateType, ASN1UniversalType.date],
  [TypeType.DateTimeType, ASN1UniversalType.dateTime],
  [TypeType.DurationType, ASN1UniversalType.duration],
  [TypeType.EmbeddedPDVType, ASN1UniversalType.embeddedPDV],
  [TypeType.EnumeratedType, ASN1UniversalType.enumerated],
  [TypeType.ExternalType, ASN1UniversalType.external],
  [TypeType.InstanceOfType, ASN1UniversalType.external],
  [TypeType.IntegerType, ASN1UniversalType.integer],
  [TypeType.IRIType, ASN1UniversalType.oidIRI],
  [TypeType.NullType, ASN1UniversalType.nill],
  // [ TypeType.ObjectClassFieldType, ASN1UniversalType ],
  [TypeType.ObjectIdentifierType, ASN1UniversalType.objectIdentifier],
  [TypeType.OctetStringType, ASN1UniversalType.octetString],
  [TypeType.RealType, ASN1UniversalType.realNumber],
  [TypeType.RelativeIRIType, ASN1UniversalType.roidIRI],
  [TypeType.RelativeOIDType, ASN1UniversalType.relativeOID],
  [TypeType.SequenceType, ASN1UniversalType.sequence],
  [TypeType.SequenceOfType, ASN1UniversalType.sequence],
  [TypeType.SetType, ASN1UniversalType.set],
  [TypeType.SetOfType, ASN1UniversalType.set],
  // [ TypeType.PrefixedType, ASN1UniversalType. ],
  [TypeType.TimeType, ASN1UniversalType.time],
  [TypeType.TimeOfDayType, ASN1UniversalType.timeOfDay],

  [TypeType.BMPString, ASN1UniversalType.bmpString],
  [TypeType.GeneralString, ASN1UniversalType.generalString],
  [TypeType.GraphicString, ASN1UniversalType.graphicString],
  [TypeType.IA5String, ASN1UniversalType.ia5String],
  [TypeType.ISO646String, ASN1UniversalType.ia5String],
  [TypeType.NumericString, ASN1UniversalType.numericString],
  [TypeType.PrintableString, ASN1UniversalType.printableString],
  [TypeType.TeletexString, ASN1UniversalType.teletexString],
  [TypeType.T61String, ASN1UniversalType.teletexString],
  [TypeType.UniversalString, ASN1UniversalType.universalString],
  [TypeType.UTF8String, ASN1UniversalType.utf8String],
  [TypeType.VideotexString, ASN1UniversalType.videotexString],
  [TypeType.VisibleString, ASN1UniversalType.visibleString],
  [TypeType.GeneralizedTime, ASN1UniversalType.generalizedTime],
  [TypeType.UTCTime, ASN1UniversalType.utcTime],
  [TypeType.ObjectDescriptor, ASN1UniversalType.objectDescriptor],
]);
