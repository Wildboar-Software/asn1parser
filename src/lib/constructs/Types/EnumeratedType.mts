import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type EnumerationItem from '../EnumerationItem.mjs';
import { type ExceptionIdentification } from '../ExceptionIdentification.mjs';

// EnumeratedType ::=
//     ENUMERATED "{" Enumerations "}"

// Enumerations ::=
//     RootEnumeration
// 	| RootEnumeration "," "..." ExceptionSpec
// 	| RootEnumeration "," "..." ExceptionSpec "," AdditionalEnumeration

// RootEnumeration ::=
//     Enumeration

// AdditionalEnumeration ::=
//     Enumeration

// Enumeration ::=
//     EnumerationItem
// 	| EnumerationItem "," Enumeration

// EnumerationItem ::=
//     identifier
// 	| NamedNumber

// EnumeratedValue ::=
//     identifier

export default interface EnumeratedType extends GrokedThing {
  items?: EnumerationItem[];
  explicitlyExtensible?: boolean;
  exception?: ExceptionIdentification;
  selfContained?: boolean;
  allItemsExplicitlyNumbered?: boolean;
}
