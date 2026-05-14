import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type NamedType from  '../NamedType.mjs';
import { type ExceptionIdentification } from '../ExceptionIdentification.mjs';

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
