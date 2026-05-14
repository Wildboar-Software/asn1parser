import type GrokedThing from '../../interfaces/GrokedThing.js';
import type NamedType from  '../NamedType.js';
import { type ExceptionIdentification } from '../ExceptionIdentification.js';

// ChoiceType ::=
// 	CHOICE "{" AlternativeTypeLists "}"

// AlternativeTypeLists ::=
//     RootAlternativeTypeList
// 	   | RootAlternativeTypeList
//          ","
//          ExtensionAndException
//          ExtensionAdditionAlternatives
//          OptionalExtensionMarker

// RootAlternativeTypeList ::=
//     AlternativeTypeList

// ExtensionAdditionAlternatives ::=
//     "," ExtensionAdditionAlternativesList
// 	| empty

// ExtensionAdditionAlternativesList ::=
//     ExtensionAdditionAlternative
// 	| ExtensionAdditionAlternativesList "," ExtensionAdditionAlternative

// ExtensionAdditionAlternative ::=
//     ExtensionAdditionAlternativesGroup
// 	| NamedType

// ExtensionAdditionAlternativesGroup ::=
// 	"[[" VersionNumber AlternativeTypeList "]]"

// AlternativeTypeList ::=
//     NamedType
//      | AlternativeTypeList "," NamedType

export default interface ChoiceType extends GrokedThing {
  rootAlternativeTypeList: NamedType[];
  explicitlyExtensible?: boolean;
  exception?: ExceptionIdentification;
  extensionAdditionAlternatives?: (
    | {
        versionNumber?: number;
        alternativeTypeList: NamedType[];
      }
    | NamedType
  )[];
}
