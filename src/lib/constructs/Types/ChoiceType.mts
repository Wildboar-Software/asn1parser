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

/**
 * An ASN.1 `CHOICE` type, which is a list of possible values.
 * 
 * ```bnf
 * ChoiceType ::= CHOICE "{" AlternativeTypeLists "}"
 * 
 * AlternativeTypeLists ::=
 *     RootAlternativeTypeList
 *   | RootAlternativeTypeList "," ExtensionAndException ExtensionAdditionAlternatives OptionalExtensionMarker
 * 
 * RootAlternativeTypeList ::= AlternativeTypeList
 * 
 * ExtensionAdditionAlternatives ::=
 *   "," ExtensionAdditionAlternativesList
 *   | empty
 * 
 * ExtensionAdditionAlternativesList ::=
 *   ExtensionAdditionAlternative
 *   | ExtensionAdditionAlternativesList "," ExtensionAdditionAlternative
 * 
 * ExtensionAdditionAlternative ::=
 *   ExtensionAdditionAlternativesGroup
 *   | NamedType
 * 
 * ExtensionAdditionAlternativesGroup ::= "[[" VersionNumber AlternativeTypeList "]]"
 * 
 * AlternativeTypeList ::= NamedType | AlternativeTypeList "," NamedType
 * ```
 */
export default interface ChoiceType extends GrokedThing {
  /**
   * The list of possible values of the `CHOICE` type.
   */
  rootAlternativeTypeList: NamedType[];
  /**
   * Whether the `CHOICE` is explicitly extensible.
   */
  explicitlyExtensible?: boolean;
  /**
   * A value describing what is to be done if an unrecognized choice value
   * is encountered.
   */
  exception?: ExceptionIdentification;
  /**
   * The list of additional alternatives (or groups of them associated with
   * a protocol version) of the `CHOICE` type.
   */
  extensionAdditionAlternatives?: (
    | {
        versionNumber?: number;
        alternativeTypeList: NamedType[];
      }
    | NamedType
  )[];
}
