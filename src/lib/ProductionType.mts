/**
 * @summary `BOOLEAN` values that are undefined, but still used widely in ASN.1
 * @description
 * ASN.1 `BOOLEAN`-related grammatical productions that are not defined in the
 * specifications, but are still widely used, even by specifications published
 * by the International Telecommunications Union itself.
 * @enum
 */
export enum InferredButUndefinedBooleanProductionType {
  _true = 'true',
  _false = 'false',
}

/**
 * @summary Symbols that are undefined, but still used widely in ASN.1.
 * @description
 * ASN.1 special characters that are not defined in any of the ASN.1
 * specifications, but which are still widely used, even by specifications published
 * by the International Telecommunications Union itself.
 * @enum
 */
export enum InferredButUndefinedSpecialCharacterProductionType {
  asterisk = 'asterisk',
  ampersand = 'ampersand',
}

/**
 * @summary Defined ASN.1 lexical productions.
 * @description
 * Lexical productions that are defined in the ASN.1 specifications.
 * @enum
 */
export enum DefinedLexicalProductionType {
  // Defined in ITU X.680 2015, Section 12.
  typereference = 'typereference', // Uppercase first char
  identifier = 'identifier', // Lowercase first char (no double hyphen or trailing hyphen)
  valuereference = 'valuereference', // Same syntax as identifier
  modulereference = 'modulereference', // Same as typeReference.
  comment = 'comment',
  empty = 'empty',
  number = 'number',
  realnumber = 'realnumber',
  bstring = 'bstring',
  xmlbstring = 'xmlbstring',
  hstring = 'hstring',
  xmlhstring = 'xmlhstring',
  cstring = 'cstring',
  xmlcstring = 'xmlcstring',
  simplestring = 'simplestring',
  tstring = 'tstring',
  xmltstring = 'xmltstring',
  psname = 'psname',
  assignment = 'assignment', // ::=
  rangeseparator = 'rangeseparator', // ..
  ellipsis = 'ellipsis',
  leftversionbrackets = 'leftversionbrackets', // [[
  rightversionbrackets = 'rightversionbrackets', // ]]
  encodingreference = 'encodingreference',
  integerUnicodeLabel = 'integerUnicodeLabel',
  nonIntegerUnicodeLabel = 'nonIntegerUnicodeLabel',
  xmlEndTagStartItem = 'xmlEndTagStartItem', // </
  xmlSingleTagEndItem = 'xmlSingleTagEndItem', // />
  true_ = 'true_', // true
  extended_true = 'extended_true', // true or 1
  false_ = 'false_', // false
  extended_false = 'extended_false', // false or 0
  NaN = 'NaN',
  INF = 'INF',
  xmlasn1typename = 'xmlasn1typename',

  // Defined in ITU X.680 2015, Section 12.37.
  curlyOpening = 'curlyOpening',
  curlyClosing = 'curlyClosing',
  lessThan = 'lessThan',
  greaterThan = 'greaterThan',
  comma = 'comma',
  period = 'period',
  forwardSlash = 'forwardSlash',
  parenthesisOpening = 'parenthesisOpening',
  parenthesisClosing = 'parenthesisClosing',
  squareOpening = 'squareOpening',
  squareClosing = 'squareClosing',
  hyphen = 'hyphen',
  colon = 'colon',
  equalSign = 'equalSign',
  quotationMark = 'quotationMark',
  apostrophe = 'apostrophe',
  space = 'space',
  semiColon = 'semiColon',
  atSign = 'atSign',
  verticalBar = 'verticalBar',
  exclamationPoint = 'exclamationPoint',
  caret = 'caret',

  // Defined in ITU X.681 2015.
  objectclassreference = 'objectclassreference',
  objectreference = 'objectreference',
  objectsetreference = 'objectsetreference',
  valuefieldreference = 'valuefieldreference',
  valuesetfieldreference = 'valuesetfieldreference',
  objectfieldreference = 'objectfieldreference',
  objectsetfieldreference = 'objectsetfieldreference',
  typefieldreference = 'typefieldreference',
  word = 'word',
}

/**
 * @summary ASN.1 Lexical productions
 * @description
 * All lexical ASN.1 productions, both those defined and undefined by the
 * ASN.1 specifications.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
export type LexicalProductionType =
  | InferredButUndefinedBooleanProductionType
  | InferredButUndefinedSpecialCharacterProductionType
  | DefinedLexicalProductionType;

/**
 * @summary ASN.1 Lexical productions
 * @description
 * All lexical ASN.1 productions, both those defined and undefined by the
 * ASN.1 specifications.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
export const LexicalProductionType = {
  ...InferredButUndefinedBooleanProductionType,
  ...InferredButUndefinedSpecialCharacterProductionType,
  ...DefinedLexicalProductionType,
};

/**
 * @summary Defined keywords
 * @description
 * Keywords defined in the ASN.1 specifications.
 * @enum
 */
export enum DefinedKeywordProductionType {
  // Defined in ITU X.680 2015, Section 12.38.
  _ABSENT = 'ABSENT',
  _ABSTRACT_SYNTAX = 'ABSTRACT_SYNTAX',
  _ALL = 'ALL',
  _APPLICATION = 'APPLICATION',
  _AUTOMATIC = 'AUTOMATIC',
  _BEGIN = 'BEGIN',
  _BIT = 'BIT',
  _BMPString = 'BMPString',
  _BOOLEAN = 'BOOLEAN',
  _BY = 'BY',
  _CHARACTER = 'CHARACTER',
  _CHOICE = 'CHOICE',
  _CLASS = 'CLASS',
  _COMPONENT = 'COMPONENT',
  _COMPONENTS = 'COMPONENTS',
  _CONSTRAINED = 'CONSTRAINED',
  _CONTAINING = 'CONTAINING',
  _DATE = 'DATE',
  _DATE_TIME = 'DATE_TIME',
  _DEFAULT = 'DEFAULT',
  _DEFINITIONS = 'DEFINITIONS',
  _DURATION = 'DURATION',
  _EMBEDDED = 'EMBEDDED',
  _ENCODED = 'ENCODED',
  _ENCODING_CONTROL = 'ENCODING_CONTROL',
  _END = 'END',
  _ENUMERATED = 'ENUMERATED',
  _EXCEPT = 'EXCEPT',
  _EXPLICIT = 'EXPLICIT',
  _EXPORTS = 'EXPORTS',
  _EXTENSIBILITY = 'EXTENSIBILITY',
  _EXTERNAL = 'EXTERNAL',
  _FALSE = 'FALSE',
  _FROM = 'FROM',
  _GeneralizedTime = 'GeneralizedTime',
  _GeneralString = 'GeneralString',
  _GraphicString = 'GraphicString',
  _IA5String = 'IA5String',
  _IDENTIFIER = 'IDENTIFIER',
  _IMPLICIT = 'IMPLICIT',
  _IMPLIED = 'IMPLIED',
  _IMPORTS = 'IMPORTS',
  _INCLUDES = 'INCLUDES',
  _INSTANCE = 'INSTANCE',
  _INSTRUCTIONS = 'INSTRUCTIONS',
  _INTEGER = 'INTEGER',
  _INTERSECTION = 'INTERSECTION',
  _ISO646String = 'ISO646String',
  _MAX = 'MAX',
  _MIN = 'MIN',
  _MINUS_INFINITY = 'MINUS_INFINITY',
  _NOT_A_NUMBER = 'NOT_A_NUMBER',
  _NULL = 'NULL',
  _NumericString = 'NumericString',
  _OBJECT = 'OBJECT',
  _ObjectDescriptor = 'ObjectDescriptor',
  _OCTET = 'OCTET',
  _OF = 'OF',
  _OID_IRI = 'OID_IRI',
  _OPTIONAL = 'OPTIONAL',
  _PATTERN = 'PATTERN',
  _PDV = 'PDV',
  _PLUS_INFINITY = 'PLUS_INFINITY',
  _PRESENT = 'PRESENT',
  _PrintableString = 'PrintableString',
  _PRIVATE = 'PRIVATE',
  _REAL = 'REAL',
  _RELATIVE_OID = 'RELATIVE_OID',
  _RELATIVE_OID_IRI = 'RELATIVE_OID_IRI',
  _SEQUENCE = 'SEQUENCE',
  _SET = 'SET',
  _SETTINGS = 'SETTINGS',
  _SIZE = 'SIZE',
  _STRING = 'STRING',
  _SYNTAX = 'SYNTAX',
  _T61String = 'T61String',
  _TAGS = 'TAGS',
  _TeletexString = 'TeletexString',
  _TIME = 'TIME',
  _TIME_OF_DAY = 'TIME_OF_DAY',
  _TRUE = 'TRUE',
  _TYPE_IDENTIFIER = 'TYPE_IDENTIFIER',
  _UNION = 'UNION',
  _UNIQUE = 'UNIQUE',
  _UNIVERSAL = 'UNIVERSAL',
  _UniversalString = 'UniversalString',
  _UTCTime = 'UTCTime',
  _UTF8String = 'UTF8String',
  _VideotexString = 'VideotexString',
  _VisibleString = 'VisibleString',
  _WITH = 'WITH',

  // Added in ITU X.680, Amendment 1.
  _SUCCESSORS = 'SUCCESSORS',
  _DESCENDANTS = 'DESCENDANTS',
}

/**
 * @summary Former ASN.1 keywords
 * @description
 * Keywords that used to be recognized as such by the ASN.1 specifications, but
 * have since been retired as keywords.
 * @enum
 */
export enum RemovedKeywordProductionType {
  _ANY = 'ANY',
  _DEFINED = 'DEFINED',
  _MACRO = 'MACRO',
  _TYPE = 'TYPE',
  _VALUE = 'VALUE',
  _NOTATION = 'NOTATION',
}

/**
 * @summary All current, former, and undefined ASN.1 keywords.
 * @description
 * All ASN.1 keywords that are now and ever have been.
 * @enum
 */
export type KeywordProductionType =
  | DefinedKeywordProductionType
  | RemovedKeywordProductionType
  | InferredButUndefinedBooleanProductionType;

/**
 * @summary All current, former, and undefined ASN.1 keywords.
 * @description
 * All ASN.1 keywords that are now and ever have been.
 * @enum
 */
export const KeywordProductionType = {
  ...DefinedKeywordProductionType,
  ...RemovedKeywordProductionType,
  ...InferredButUndefinedBooleanProductionType,
};

/**
 * @summary Removed literal production types
 * @enum
 */
export enum RemovedLiteralProductionType {
  _string = '"string"',
  _identifier = '"identifier"',
  _number = '"number"',
  _empty = '"empty"',
}

/**
 * @summary Removed lexical productions
 * @description
 * Lexical productions that were formerly defined in the ASN.1 specifications,
 * but which have been removed.
 * @enum
 */
export enum RemovedLexicalProductionType {
  astring = 'astring',
  productionreference = 'productionreference',
  localtypereference = 'localtypereference',
  localvaluereference = 'localvaluereference',
}

/**
 * @summary Removed non-terminal productions
 * @description
 * Productions that are defined in terms of other grammatical productions, but
 * which were removed from the ASN.1 specifications.
 * @enum
 */
export enum RemovedNonTerminalProductionType {
  AnyType = 'AnyType',
  AnyValue = 'AnyValue',
  macroreference = 'macroreference', // Same syntax as objectclassreference
  MacroDefinition = 'MacroDefinition',
  MacroSubstance = 'MacroSubstance',
  MacroBody = 'MacroBody',
  TypeProduction = 'TypeProduction',
  ValueProduction = 'ValueProduction',
  SupportingProduction = 'SupportingProduction',
  ProductionList = 'ProductionList',
  Production = 'Production',
  Externalmacroreference = 'Externalmacroreference',
  MacroAlternativeList = 'MacroAlternativeList',
  SymbolElement = 'SymbolElement',
  SymbolDefn = 'SymbolDefn',
  EmbeddedDefinitions = 'EmbeddedDefinitions',
  MacroType = 'MacroType',
  EmbeddedDefinitionList = 'EmbeddedDefinitionList',
  EmbeddedDefinition = 'EmbeddedDefinition',
  LocalTypeassignment = 'LocalTypeassignment',
  LocalValueassignment = 'LocalValueassignment',
  MacroValue = 'MacroValue',
}

/**
 * @summary Removed productions
 * @description
 * Productions of all kinds that have been removed from the ASN.1
 * specifications.
 * @enum
 */
export type RemovedProductionType =
  | RemovedKeywordProductionType
  | RemovedLiteralProductionType
  | RemovedLexicalProductionType
  | RemovedNonTerminalProductionType;

/**
 * @summary Removed productions
 * @description
 * Productions of all kinds that have been removed from the ASN.1
 * specifications.
 * @enum
 */
export const RemovedProductionType = {
  ...RemovedKeywordProductionType,
  ...RemovedLiteralProductionType,
  ...RemovedLexicalProductionType,
  ...RemovedNonTerminalProductionType,
};

/**
 * @summary Arbitrary, unofficial productions for convenience
 * @description
 * Productions that were defined arbitrarily for convenience purposes.
 * @enum
 */
export enum ConvenienceProductionType {
  /**
   * These are production types solely for containing entire documents / files,
   * which, in turn, may contain multiple modules within them, comments, and
   * whitespace.
   */
  document = 'document',
  modules = 'modules',

  /**
   * These production types solely exist for parsing convenience.
   */
  Constraints = 'Constraints',
}

/**
 * @summary Whitespace productions
 * @description
 * The following are not defined in a standard, but still necessary.
 * Notably, a distinction must be drawn between newline and non-newline
 * whitespace, because, non-exclusively, newlines are used to terminate
 * single-line comments.
 * @enum
 */
export enum WhitespaceProductionType {
  /**
   * From [the Wiki on Newline Characters](https://en.wikipedia.org/wiki/Newline#Unicode),
   * the following ought to be considered newline characters:
   * - `LF`:    Line Feed, `U+000A`
   * - `VT`:    Vertical Tab, `U+000B`
   * - `FF`:    Form Feed, `U+000C`
   * - `CR`:    Carriage Return, `U+000D`
   * - `NEL`:   Next Line, `U+0085`
   * - `LS`:    Line Separator, `U+2028`
   * - `PS`:    Paragraph Separator, `U+2029`
   */
  newlineWhitespace = 'newlineWhitespace',

  /**
   * Includes all of the whitespace Unicode characters named on the
   * [Wiki for Whitespace Characters](https://en.wikipedia.org/wiki/Whitespace_character),
   * but omitting newline characters.
   *
   * Inclues:
   * - `TAB` / `U+0009`
   * - `SP` / `U+0020`
   * - `NBSP` / `U+00A0`
   * - `U+1680`
   * - `U+2000` - `U+200A` (inclusive)
   * - `U+202F`
   * - `U+205F`
   * - `U+3000`
   */
  nonNewlineWhitespace = 'nonNewlineWhitespace',
}

/**
 * @summary Official productions that were accidentally omitted from the final
 *  list of grammatical productions.
 * @description
 * These are not present in the final list of productions, but they are defined
 * in the body of the standard.
 * @enum
 */
export enum UnlistedProductionType {
  EncodingInstruction = 'EncodingInstruction',
  EncodingInstructionAssignmentList = 'EncodingInstructionAssignmentList',
}

/**
 * @summary Productions defined to control aspects of the parsing itself.
 * @description
 * These are productions that are not defined in any specification, but exist
 * to control aspects of the compilation itself.
 * @enum
 */
export enum ControlProductionType {
  /**
   * This is a "fake" production that signals a syntax error in parsing.
   */
  SYNTAX_ERROR = 'SYNTAX-ERROR',
}

/**
 * @summary All productions that are not composed of other productions
 * @description
 * All productions that are not defined in terms of some other grammatical
 * productions and which, therefore, may be emitted as a result of lexing.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
export type TerminalProductionType =
  | WhitespaceProductionType
  | LexicalProductionType
  | KeywordProductionType
  | InferredButUndefinedBooleanProductionType
  | InferredButUndefinedSpecialCharacterProductionType
  | RemovedKeywordProductionType
  | RemovedLiteralProductionType
  | RemovedLexicalProductionType;

/**
 * @summary All productions that are not composed of other productions
 * @description
 * All productions that are not defined in terms of some other grammatical
 * productions and which, therefore, may be emitted as a result of lexing.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
export const TerminalProductionType = {
  ...WhitespaceProductionType,
  ...LexicalProductionType,
  ...KeywordProductionType,
  ...InferredButUndefinedBooleanProductionType,
  ...InferredButUndefinedSpecialCharacterProductionType,
  ...RemovedKeywordProductionType,
  ...RemovedLiteralProductionType,
  ...RemovedLexicalProductionType,
};

/**
 * @summary Productions that are defined in terms of other productions
 * @description
 * Productions that are defined in terms of other grammtical productions. These
 * cannot be emitted from lexing.
 * @enum
 */
export enum NonTerminalProductionType {
  /**
   * A superset containing, exclusively, the members of newlineWhitespace and
   * nonNewlineWhitespace.
   */
  whitespace = 'whitespace',

  ModuleDefinition = 'ModuleDefinition',
  ModuleIdentifier = 'ModuleIdentifier',
  DefinitiveIdentification = 'DefinitiveIdentification',
  DefinitiveOID = 'DefinitiveOID',
  DefinitiveOIDandIRI = 'DefinitiveOIDandIRI',
  DefinitiveObjIdComponentList = 'DefinitiveObjIdComponentList',
  DefinitiveObjIdComponent = 'DefinitiveObjIdComponent',
  DefinitiveNumberForm = 'DefinitiveNumberForm',
  DefinitiveNameAndNumberForm = 'DefinitiveNameAndNumberForm',
  EncodingReferenceDefault = 'EncodingReferenceDefault',
  TagDefault = 'TagDefault',
  ExtensionDefault = 'ExtensionDefault',
  ModuleBody = 'ModuleBody',
  Exports = 'Exports',
  SymbolsExported = 'SymbolsExported',
  Imports = 'Imports',
  SymbolsImported = 'SymbolsImported',
  SymbolsFromModuleList = 'SymbolsFromModuleList',
  SymbolsFromModule = 'SymbolsFromModule',
  GlobalModuleReference = 'GlobalModuleReference',
  AssignedIdentifier = 'AssignedIdentifier',
  SymbolList = 'SymbolList',
  Symbol = 'Symbol',
  Reference = 'Reference',
  AssignmentList = 'AssignmentList',
  Assignment = 'Assignment',
  DefinedType = 'DefinedType',
  DefinedValue = 'DefinedValue',
  NonParameterizedTypeName = 'NonParameterizedTypeName',
  ExternalTypeReference = 'ExternalTypeReference',
  ExternalValueReference = 'ExternalValueReference',
  AbsoluteReference = 'AbsoluteReference',
  ItemSpec = 'ItemSpec',
  ItemId = 'ItemId',
  ComponentId = 'ComponentId',
  TypeAssignment = 'TypeAssignment',
  ValueAssignment = 'ValueAssignment',
  XMLValueAssignment = 'XMLValueAssignment',
  XMLTypedValue = 'XMLTypedValue',
  ValueSetTypeAssignment = 'ValueSetTypeAssignment',
  ValueSet = 'ValueSet',
  Type = 'Type',
  BuiltinType = 'BuiltinType',
  ReferencedType = 'ReferencedType',
  NamedType = 'NamedType',
  Value = 'Value',
  XMLValue = 'XMLValue',
  BuiltinValue = 'BuiltinValue',
  XMLBuiltinValue = 'XMLBuiltinValue',
  ReferencedValue = 'ReferencedValue',
  NamedValue = 'NamedValue',
  XMLNamedValue = 'XMLNamedValue',
  BooleanType = 'BooleanType',
  BooleanValue = 'BooleanValue',
  XMLBooleanValue = 'XMLBooleanValue',
  EmptyElementBoolean = 'EmptyElementBoolean',
  TextBoolean = 'TextBoolean',
  IntegerType = 'IntegerType',
  NamedNumberList = 'NamedNumberList',
  NamedNumber = 'NamedNumber',
  SignedNumber = 'SignedNumber',
  IntegerValue = 'IntegerValue',
  XMLIntegerValue = 'XMLIntegerValue',
  XMLSignedNumber = 'XMLSignedNumber',
  EmptyElementInteger = 'EmptyElementInteger',
  TextInteger = 'TextInteger',
  EnumeratedType = 'EnumeratedType',
  Enumerations = 'Enumerations',
  RootEnumeration = 'RootEnumeration',
  AdditionalEnumeration = 'AdditionalEnumeration',
  Enumeration = 'Enumeration',
  EnumerationItem = 'EnumerationItem',
  EnumeratedValue = 'EnumeratedValue',
  XMLEnumeratedValue = 'XMLEnumeratedValue',
  EmptyElementEnumerated = 'EmptyElementEnumerated',
  TextEnumerated = 'TextEnumerated',
  RealType = 'RealType',
  RealValue = 'RealValue',
  NumericRealValue = 'NumericRealValue',
  SpecialRealValue = 'SpecialRealValue',
  XMLRealValue = 'XMLRealValue',
  XMLNumericRealValue = 'XMLNumericRealValue',
  XMLSpecialRealValue = 'XMLSpecialRealValue',
  EmptyElementReal = 'EmptyElementReal',
  TextReal = 'TextReal',
  BitStringType = 'BitStringType',
  NamedBitList = 'NamedBitList',
  NamedBit = 'NamedBit',
  BitStringValue = 'BitStringValue',
  IdentifierList = 'IdentifierList',
  XMLBitStringValue = 'XMLBitStringValue',
  XMLIdentifierList = 'XMLIdentifierList',
  EmptyElementList = 'EmptyElementList',
  TextList = 'TextList',
  OctetStringType = 'OctetStringType',
  OctetStringValue = 'OctetStringValue',
  XMLOctetStringValue = 'XMLOctetStringValue',
  NullType = 'NullType',
  NullValue = 'NullValue',
  XMLNullValue = 'XMLNullValue',
  SequenceType = 'SequenceType',
  ExtensionAndException = 'ExtensionAndException',
  OptionalExtensionMarker = 'OptionalExtensionMarker',
  ComponentTypeLists = 'ComponentTypeLists',
  RootComponentTypeList = 'RootComponentTypeList',
  ExtensionEndMarker = 'ExtensionEndMarker',
  ExtensionAdditions = 'ExtensionAdditions',
  ExtensionAdditionList = 'ExtensionAdditionList',
  ExtensionAddition = 'ExtensionAddition',
  ExtensionAdditionGroup = 'ExtensionAdditionGroup',
  VersionNumber = 'VersionNumber',
  ComponentTypeList = 'ComponentTypeList',
  ComponentType = 'ComponentType',
  SequenceValue = 'SequenceValue',
  ComponentValueList = 'ComponentValueList',
  XMLSequenceValue = 'XMLSequenceValue',
  XMLComponentValueList = 'XMLComponentValueList',
  SequenceOfType = 'SequenceOfType',
  SequenceOfValue = 'SequenceOfValue',
  ValueList = 'ValueList',
  NamedValueList = 'NamedValueList',
  XMLSequenceOfValue = 'XMLSequenceOfValue',
  XMLValueList = 'XMLValueList',
  XMLValueOrEmpty = 'XMLValueOrEmpty',
  XMLDelimitedItemList = 'XMLDelimitedItemList',
  XMLDelimitedItem = 'XMLDelimitedItem',
  SetType = 'SetType',
  SetValue = 'SetValue',
  XMLSetValue = 'XMLSetValue',
  SetOfType = 'SetOfType',
  SetOfValue = 'SetOfValue',
  XMLSetOfValue = 'XMLSetOfValue',
  ChoiceType = 'ChoiceType',
  AlternativeTypeLists = 'AlternativeTypeLists',
  RootAlternativeTypeList = 'RootAlternativeTypeList',
  ExtensionAdditionAlternatives = 'ExtensionAdditionAlternatives',
  ExtensionAdditionAlternativesList = 'ExtensionAdditionAlternativesList',
  ExtensionAdditionAlternative = 'ExtensionAdditionAlternative',
  ExtensionAdditionAlternativesGroup = 'ExtensionAdditionAlternativesGroup',
  AlternativeTypeList = 'AlternativeTypeList',
  ChoiceValue = 'ChoiceValue',
  XMLChoiceValue = 'XMLChoiceValue',
  SelectionType = 'SelectionType',
  PrefixedType = 'PrefixedType',
  PrefixedValue = 'PrefixedValue',
  XMLPrefixedValue = 'XMLPrefixedValue',
  TaggedType = 'TaggedType',
  Tag = 'Tag',
  EncodingReference = 'EncodingReference',
  ClassNumber = 'ClassNumber',
  Class = 'Class',
  EncodingPrefixedType = 'EncodingPrefixedType',
  EncodingPrefix = 'EncodingPrefix',
  ObjectIdentifierType = 'ObjectIdentifierType',
  ObjectIdentifierValue = 'ObjectIdentifierValue',
  ObjIdComponentsList = 'ObjIdComponentsList',
  ObjIdComponents = 'ObjIdComponents',
  NameForm = 'NameForm',
  NumberForm = 'NumberForm',
  NameAndNumberForm = 'NameAndNumberForm',
  XMLObjectIdentifierValue = 'XMLObjectIdentifierValue',
  XMLObjIdComponentList = 'XMLObjIdComponentList',
  XMLObjIdComponent = 'XMLObjIdComponent',
  XMLNumberForm = 'XMLNumberForm',
  XMLNameAndNumberForm = 'XMLNameAndNumberForm',
  RelativeOIDType = 'RelativeOIDType',
  RelativeOIDValue = 'RelativeOIDValue',
  RelativeOIDComponentsList = 'RelativeOIDComponentsList',
  RelativeOIDComponents = 'RelativeOIDComponents',
  XMLRelativeOIDValue = 'XMLRelativeOIDValue',
  XMLRelativeOIDComponentList = 'XMLRelativeOIDComponentList',
  XMLRelativeOIDComponent = 'XMLRelativeOIDComponent',
  IRIType = 'IRIType',
  IRIValue = 'IRIValue',
  FirstArcIdentifier = 'FirstArcIdentifier',
  SubsequentArcIdentifier = 'SubsequentArcIdentifier',
  ArcIdentifier = 'ArcIdentifier',
  XMLIRIValue = 'XMLIRIValue',
  RelativeIRIType = 'RelativeIRIType',
  RelativeIRIValue = 'RelativeIRIValue',
  FirstRelativeArcIdentifier = 'FirstRelativeArcIdentifier',
  XMLRelativeIRIValue = 'XMLRelativeIRIValue',
  EmbeddedPDVType = 'EmbeddedPDVType',
  EmbeddedPDVValue = 'EmbeddedPDVValue',
  XMLEmbeddedPDVValue = 'XMLEmbeddedPDVValue',
  ExternalType = 'ExternalType',
  ExternalValue = 'ExternalValue',
  XMLExternalValue = 'XMLExternalValue',
  TimeType = 'TimeType',
  TimeValue = 'TimeValue',
  XMLTimeValue = 'XMLTimeValue',
  DateType = 'DateType',
  TimeOfDayType = 'TimeOfDayType',
  DateTimeType = 'DateTimeType',
  DurationType = 'DurationType',
  CharacterStringType = 'CharacterStringType',
  CharacterStringValue = 'CharacterStringValue',
  XMLCharacterStringValue = 'XMLCharacterStringValue',
  RestrictedCharacterStringType = 'RestrictedCharacterStringType',
  RestrictedCharacterStringValue = 'RestrictedCharacterStringValue',
  CharacterStringList = 'CharacterStringList',
  CharSyms = 'CharSyms',
  CharsDefn = 'CharsDefn',
  Quadruple = 'Quadruple',
  Group = 'Group',
  Plane = 'Plane',
  Row = 'Row',
  Cell = 'Cell',
  Tuple = 'Tuple',
  TableColumn = 'TableColumn',
  TableRow = 'TableRow',
  XMLRestrictedCharacterStringValue = 'XMLRestrictedCharacterStringValue',
  UnrestrictedCharacterStringType = 'UnrestrictedCharacterStringType',
  UnrestrictedCharacterStringValue = 'UnrestrictedCharacterStringValue',
  XMLUnrestrictedCharacterStringValue = 'XMLUnrestrictedCharacterStringValue',
  UsefulType = 'UsefulType',
  ConstrainedType = 'ConstrainedType',
  TypeWithConstraint = 'TypeWithConstraint',
  Constraint = 'Constraint',
  ConstraintSpec = 'ConstraintSpec',
  SubtypeConstraint = 'SubtypeConstraint',
  ElementSetSpecs = 'ElementSetSpecs',
  RootElementSetSpec = 'RootElementSetSpec',
  AdditionalElementSetSpec = 'AdditionalElementSetSpec',
  ElementSetSpec = 'ElementSetSpec',
  Unions = 'Unions',
  UElems = 'UElems',
  Intersections = 'Intersections',
  IElems = 'IElems',
  IntersectionElements = 'IntersectionElements',
  Elems = 'Elems',
  Exclusions = 'Exclusions',
  UnionMark = 'UnionMark',
  IntersectionMark = 'IntersectionMark',
  Elements = 'Elements',
  SubtypeElements = 'SubtypeElements',
  SingleValue = 'SingleValue',
  ContainedSubtype = 'ContainedSubtype',
  Includes = 'Includes',
  ValueRange = 'ValueRange',
  LowerEndpoint = 'LowerEndpoint',
  UpperEndpoint = 'UpperEndpoint',
  LowerEndValue = 'LowerEndValue',
  UpperEndValue = 'UpperEndValue',
  SizeConstraint = 'SizeConstraint',
  TypeConstraint = 'TypeConstraint',
  PermittedAlphabet = 'PermittedAlphabet',
  InnerTypeConstraints = 'InnerTypeConstraints',
  SingleTypeConstraint = 'SingleTypeConstraint',
  MultipleTypeConstraints = 'MultipleTypeConstraints',
  FullSpecification = 'FullSpecification',
  PartialSpecification = 'PartialSpecification',
  TypeConstraints = 'TypeConstraints',
  NamedConstraint = 'NamedConstraint',
  ComponentConstraint = 'ComponentConstraint',
  ValueConstraint = 'ValueConstraint',
  PresenceConstraint = 'PresenceConstraint',
  PatternConstraint = 'PatternConstraint',
  PropertySettings = 'PropertySettings',
  PropertySettingsList = 'PropertySettingsList',
  PropertyAndSettingPair = 'PropertyAndSettingPair',
  PropertyName = 'PropertyName',
  SettingName = 'SettingName',
  DurationRange = 'DurationRange',
  TimePointRange = 'TimePointRange',
  RecurrenceRange = 'RecurrenceRange',
  ExceptionSpec = 'ExceptionSpec',
  ExceptionIdentification = 'ExceptionIdentification',
  EncodingControlSections = 'EncodingControlSections',
  EncodingControlSection = 'EncodingControlSection',
  DefinedObjectClass = 'DefinedObjectClass',
  ExternalObjectClassReference = 'ExternalObjectClassReference',
  UsefulObjectClassReference = 'UsefulObjectClassReference',
  ObjectClassAssignment = 'ObjectClassAssignment',
  ObjectClass = 'ObjectClass',
  ObjectClassDefn = 'ObjectClassDefn',
  FieldSpec = 'FieldSpec',
  PrimitiveFieldName = 'PrimitiveFieldName',
  FieldName = 'FieldName',
  TypeFieldSpec = 'TypeFieldSpec',
  TypeOptionalitySpec = 'TypeOptionalitySpec',
  TypeFixedTypeValueFieldSpec = 'TypeFixedTypeValueFieldSpec',
  ValueOptionalitySpec = 'ValueOptionalitySpec',
  VariableTypeValueFieldSpec = 'VariableTypeValueFieldSpec',
  FixedTypeValueSetFieldSpec = 'FixedTypeValueSetFieldSpec',
  ValueSetOptionalitySpec = 'ValueSetOptionalitySpec',
  VariableTypeValueSetFieldSpec = 'VariableTypeValueSetFieldSpec',
  ObjectFieldSpec = 'ObjectFieldSpec',
  ObjectOptionalitySpec = 'ObjectOptionalitySpec',
  ObjectSetFieldSpec = 'ObjectSetFieldSpec',
  ObjectSetOptionalitySpec = 'ObjectSetOptionalitySpec',
  WithSyntaxSpec = 'WithSyntaxSpec',
  SyntaxList = 'SyntaxList',
  TokenOrGroupSpec = 'TokenOrGroupSpec',
  OptionalGroup = 'OptionalGroup',
  RequiredToken = 'RequiredToken',
  Literal = 'Literal',
  DefinedObject = 'DefinedObject',
  ExternalObjectReference = 'ExternalObjectReference',
  ObjectAssignment = 'ObjectAssignment',
  Object = 'Object',
  ObjectDefn = 'ObjectDefn',
  DefaultSyntax = 'DefaultSyntax',
  FieldSetting = 'FieldSetting',
  DefinedSyntax = 'DefinedSyntax',
  DefinedSyntaxToken = 'DefinedSyntaxToken',
  Setting = 'Setting',
  DefinedObjectSet = 'DefinedObjectSet',
  ExternalObjectSetReference = 'ExternalObjectSetReference',
  ObjectSetAssignment = 'ObjectSetAssignment',
  ObjectSet = 'ObjectSet',
  ObjectSetSpec = 'ObjectSetSpec',
  ObjectSetElements = 'ObjectSetElements',
  ObjectClassFieldType = 'ObjectClassFieldType',
  ObjectClassFieldValue = 'ObjectClassFieldValue',
  OpenTypeFieldVal = 'OpenTypeFieldVal',
  FixedTypeFieldVal = 'FixedTypeFieldVal',
  FixedTypeValueFieldSpec = 'FixedTypeValueFieldSpec',
  XMLObjectClassFieldValue = 'XMLObjectClassFieldValue',
  XMLOpenTypeFieldVal = 'XMLOpenTypeFieldVal',
  XMLFixedTypeFieldVal = 'XMLFixedTypeFieldVal',
  InformationFromObjects = 'InformationFromObjects',
  ReferencedObjects = 'ReferencedObjects',
  ValueFromObject = 'ValueFromObject',
  ValueSetFromObjects = 'ValueSetFromObjects',
  TypeFromObject = 'TypeFromObject',
  ObjectFromObject = 'ObjectFromObject',
  ObjectSetFromObjects = 'ObjectSetFromObjects',
  InstanceOfType = 'InstanceOfType',
  InstanceOfValue = 'InstanceOfValue',
  XMLInstanceOfValue = 'XMLInstanceOfValue',
  GeneralConstraint = 'GeneralConstraint',
  UserDefinedConstraint = 'UserDefinedConstraint',
  UserDefinedConstraintParameter = 'UserDefinedConstraintParameter',
  TableConstraint = 'TableConstraint',
  SimpleTableConstraint = 'SimpleTableConstraint',
  ComponentRelationConstraint = 'ComponentRelationConstraint',
  AtNotation = 'AtNotation',
  Level = 'Level',
  ComponentIdList = 'ComponentIdList',
  ContentsConstraint = 'ContentsConstraint',
  ParameterizedAssignment = 'ParameterizedAssignment',
  ParameterizedTypeAssignment = 'ParameterizedTypeAssignment',
  ParameterizedValueAssignment = 'ParameterizedValueAssignment',
  ParameterizedValueSetTypeAssignment = 'ParameterizedValueSetTypeAssignment',
  ParameterizedObjectClassAssignment = 'ParameterizedObjectClassAssignment',
  ParameterizedObjectAssignment = 'ParameterizedObjectAssignment',
  ParameterizedObjectSetAssignment = 'ParameterizedObjectSetAssignment',
  ParameterList = 'ParameterList',
  Parameter = 'Parameter',
  ParamGovernor = 'ParamGovernor',
  Governor = 'Governor',
  DummyGovernor = 'DummyGovernor',
  DummyReference = 'DummyReference',
  ParameterizedReference = 'ParameterizedReference',
  SimpleDefinedType = 'SimpleDefinedType',
  SimpleDefinedValue = 'SimpleDefinedValue',
  ParameterizedType = 'ParameterizedType',
  ParameterizedValue = 'ParameterizedValue',
  ParameterizedValueSetType = 'ParameterizedValueSetType',
  ParameterizedObjectClass = 'ParameterizedObjectClass',
  ParameterizedObjectSet = 'ParameterizedObjectSet',
  ParameterizedObject = 'ParameterizedObject',
  ActualParameterList = 'ActualParameterList',
  ActualParameter = 'ActualParameter',

  // Added in ITU X.680, Amendment 1.
  SelectionOption = 'SelectionOption',
}

/**
 * @summary All official, unofficial, current defined, and formerly defined
 *  ASN.1 productions.
 * @description
 * All ASN.1 productions that have ever been defined as well as those defined
 * unofficially in this library.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
type ProductionType =
  | LexicalProductionType
  | KeywordProductionType
  | RemovedProductionType
  | ConvenienceProductionType
  | WhitespaceProductionType
  | InferredButUndefinedBooleanProductionType
  | InferredButUndefinedSpecialCharacterProductionType
  | UnlistedProductionType
  | ControlProductionType
  | NonTerminalProductionType;

/**
 * @summary All official, unofficial, current defined, and formerly defined
 *  ASN.1 productions.
 * @description
 * All ASN.1 productions that have ever been defined as well as those defined
 * unofficially in this library.
 * @enum
 * @see https://github.com/microsoft/TypeScript/issues/17592#issuecomment-449440944
 */
const ProductionType = {
  ...LexicalProductionType,
  ...KeywordProductionType,
  ...RemovedProductionType,
  ...ConvenienceProductionType,
  ...WhitespaceProductionType,
  ...InferredButUndefinedBooleanProductionType,
  ...InferredButUndefinedSpecialCharacterProductionType,
  ...UnlistedProductionType,
  ...ControlProductionType,
  ...NonTerminalProductionType,
} as const;

export default ProductionType;
