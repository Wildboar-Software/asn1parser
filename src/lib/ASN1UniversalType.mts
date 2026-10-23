/**
 * ASN.1 `UNIVERSAL` type tag numbers as used in ITU-T Recommendation X.690.
 *
 * A const object rather than an enum, so this module is valid under
 * `erasableSyntaxOnly`. The namespace keeps each member usable as a type.
 * Unlike a numeric enum, there is no reverse mapping from tag number to name.
 */
export const ASN1UniversalType = {
  endOfContent: 0,
  boolean: 1,
  integer: 2,
  bitString: 3,
  octetString: 4,
  nill: 5,
  objectIdentifier: 6,
  objectDescriptor: 7,
  external: 8,
  realNumber: 9,
  enumerated: 10,
  embeddedPDV: 11,
  utf8String: 12,
  relativeOID: 13,
  reserved14: 14,
  time: 14,
  reserved15: 15,
  sequence: 16,
  set: 17,
  numericString: 18,
  printableString: 19,
  teletexString: 20,
  videotexString: 21,
  ia5String: 22,
  utcTime: 23,
  generalizedTime: 24,
  graphicString: 25,
  visibleString: 26,
  generalString: 27,
  universalString: 28,
  characterString: 29,
  bmpString: 30,
  date: 31,
  timeOfDay: 32,
  dateTime: 33,
  duration: 34,
  oidIRI: 35,
  roidIRI: 36,
} as const;

export type ASN1UniversalType = (typeof ASN1UniversalType)[keyof typeof ASN1UniversalType];

export namespace ASN1UniversalType {
  export type endOfContent = (typeof ASN1UniversalType)['endOfContent'];
  // `boolean` is a reserved type name, so this member is only a value.
  // Use `typeof ASN1UniversalType.boolean` where a member type is required.
  export type integer = (typeof ASN1UniversalType)['integer'];
  export type bitString = (typeof ASN1UniversalType)['bitString'];
  export type octetString = (typeof ASN1UniversalType)['octetString'];
  export type nill = (typeof ASN1UniversalType)['nill'];
  export type objectIdentifier = (typeof ASN1UniversalType)['objectIdentifier'];
  export type objectDescriptor = (typeof ASN1UniversalType)['objectDescriptor'];
  export type external = (typeof ASN1UniversalType)['external'];
  export type realNumber = (typeof ASN1UniversalType)['realNumber'];
  export type enumerated = (typeof ASN1UniversalType)['enumerated'];
  export type embeddedPDV = (typeof ASN1UniversalType)['embeddedPDV'];
  export type utf8String = (typeof ASN1UniversalType)['utf8String'];
  export type relativeOID = (typeof ASN1UniversalType)['relativeOID'];
  export type reserved14 = (typeof ASN1UniversalType)['reserved14'];
  export type time = (typeof ASN1UniversalType)['time'];
  export type reserved15 = (typeof ASN1UniversalType)['reserved15'];
  export type sequence = (typeof ASN1UniversalType)['sequence'];
  export type set = (typeof ASN1UniversalType)['set'];
  export type numericString = (typeof ASN1UniversalType)['numericString'];
  export type printableString = (typeof ASN1UniversalType)['printableString'];
  export type teletexString = (typeof ASN1UniversalType)['teletexString'];
  export type videotexString = (typeof ASN1UniversalType)['videotexString'];
  export type ia5String = (typeof ASN1UniversalType)['ia5String'];
  export type utcTime = (typeof ASN1UniversalType)['utcTime'];
  export type generalizedTime = (typeof ASN1UniversalType)['generalizedTime'];
  export type graphicString = (typeof ASN1UniversalType)['graphicString'];
  export type visibleString = (typeof ASN1UniversalType)['visibleString'];
  export type generalString = (typeof ASN1UniversalType)['generalString'];
  export type universalString = (typeof ASN1UniversalType)['universalString'];
  export type characterString = (typeof ASN1UniversalType)['characterString'];
  export type bmpString = (typeof ASN1UniversalType)['bmpString'];
  export type date = (typeof ASN1UniversalType)['date'];
  export type timeOfDay = (typeof ASN1UniversalType)['timeOfDay'];
  export type dateTime = (typeof ASN1UniversalType)['dateTime'];
  export type duration = (typeof ASN1UniversalType)['duration'];
  export type oidIRI = (typeof ASN1UniversalType)['oidIRI'];
  export type roidIRI = (typeof ASN1UniversalType)['roidIRI'];
}
