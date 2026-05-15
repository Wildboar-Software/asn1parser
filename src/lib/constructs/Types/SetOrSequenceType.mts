import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type ExceptionIdentification } from '../ExceptionIdentification.mjs';
import { type ComponentType } from '../ComponentType.mjs';

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
  /**
   * Root component type list 1: components that must come at the beginning of
   * the `SEQUENCE` (not true with a `SET`).
   */
  rootComponentTypeList1?: ComponentType[];

  /**
   * Extension additions: components added as later extensions to a
   * `SEQUENCE` or `SET`s type definition.
   */
  extensionAdditionList?: (
    | ComponentType
    | {
        /**
         * The application protocol version in which this group of components
         * was added.
         */
        versionNumber?: number;
        /**
         * The components in this extension addition group.
         */
        componentTypeList: ComponentType[];
      }
  )[];

  /**
   * Root component type list 2: components that must come at the end of the
   * `SEQUENCE` (not true with a `SET`).
   */
  rootComponentTypeList2?: ComponentType[];

  /**
   * Whether the `SET` or `SEQUENCE` is explicitly extensible.
   */
  explicitlyExtensible?: boolean;

  /**
   * A value describing what is to be done if an unrecognized extension is
   * encountered.
   */
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
