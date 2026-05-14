import type GrokedThing from '../../interfaces/GrokedThing.js';
import type EnumerationItem from '../EnumerationItem.js';
import { type ExceptionIdentification } from '../ExceptionIdentification.js';

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
