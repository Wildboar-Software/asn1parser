import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type ExceptionIdentification } from '../ExceptionIdentification.js';
import { type ComponentType } from '../ComponentType.js';

// SequenceType ::=
//  SEQUENCE "{" "}"
// 	| SEQUENCE "{" ExtensionAndException OptionalExtensionMarker "}"
// 	| SEQUENCE "{" ComponentTypeLists "}"

// SetType ::=
//  SET "{" "}"
// 	| SET "{" ExtensionAndException OptionalExtensionMarker "}"
// 	| SET "{" ComponentTypeLists "}"

// ExtensionAndException ::=
//     "..."
// 	| "..." ExceptionSpec

// OptionalExtensionMarker ::=
// 	"," "..."
// 	| empty

// ComponentTypeLists ::=
//     RootComponentTypeList
// 	| RootComponentTypeList "," ExtensionAndException ExtensionAdditions OptionalExtensionMarker
// 	| RootComponentTypeList "," ExtensionAndException ExtensionAdditions ExtensionEndMarker  "," RootComponentTypeList
// 	| ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
// 	| ExtensionAndException ExtensionAdditions OptionalExtensionMarker

// RootComponentTypeList ::=
//     ComponentTypeList

// ExtensionEndMarker ::= "," "..."

// ExtensionAdditions ::=
//     "," ExtensionAdditionList
// 	| empty

// ExtensionAdditionList ::=
//     ExtensionAddition
// 	| ExtensionAdditionList "," ExtensionAddition

// ExtensionAddition ::=
//     ComponentType
// 	| ExtensionAdditionGroup

// ExtensionAdditionGroup ::=
// 	"[[" VersionNumber ComponentTypeList "]]"

// VersionNumber ::=
// 	empty
// 	| number ":"

// ComponentTypeList ::=
//     ComponentType
// 	| ComponentTypeList "," ComponentType

// ComponentType ::=
//     NamedType
// 	| NamedType OPTIONAL
// 	| NamedType DEFAULT Value
// 	| COMPONENTS OF Type

export default interface SetOrSequenceType extends GrokedThing {
  rootComponentTypeList1?: ComponentType[];
  extensionAdditionList?: (
    | ComponentType
    | {
        versionNumber?: number;
        componentTypeList: ComponentType[];
      }
  )[];
  rootComponentTypeList2?: ComponentType[];
  explicitlyExtensible?: boolean;
  exception?: ExceptionIdentification;

  /**
   * This is `true` if the root component type list of a  `SET` or `SEQUENCE`
   * does not contain a `COMPONENTS OF` component type. This is important
   * because such a component would require an ASN.1 compiler (or other
   * program that uses the ASN.1 structures produced by this library) to find
   * the type definitions to which the `COMPONENTS OF` clause refers before it
   * can be completely understood.
   *
   * This only applies to the root component types, because all extensions are
   * irrelevant to the purposes for which this is used.
   */
  hasSelfContainedRootComponentTypeList?: boolean;

  /**
   * This will only be populated if the `SET` or `SEQUENCE`
   * `hasSelfContainedRootComponentTypeList`, because only then can the
   * optionality of all root components be readily determined by this groker.
   */
  hasOptionalRootComponentTypes?: boolean;
}
