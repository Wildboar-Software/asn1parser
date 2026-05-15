import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type EnumerationItem from '../EnumerationItem.mjs';
import { type ExceptionIdentification } from '../ExceptionIdentification.mjs';

/**
 * An ASN.1 `ENUMERATED` type, which is a list of possible values.
 * 
 * ```bnf
 * EnumeratedType ::= ENUMERATED "{" Enumerations "}"
 * 
 * Enumerations ::=
 *     RootEnumeration
 *   | RootEnumeration "," "..." ExceptionSpec
 *   | RootEnumeration "," "..." ExceptionSpec "," AdditionalEnumeration
 * 
 * RootEnumeration ::= Enumeration
 * AdditionalEnumeration ::= Enumeration
 * 
 * Enumeration ::=
 *     EnumerationItem
 *   | EnumerationItem "," Enumeration
 * 
 * EnumerationItem ::= identifier | NamedNumber
 * 
 * NamedNumber ::=
 *     identifier "(" SignedNumber ")"
 *   | identifier "(" DefinedValue ")"
 */
export default interface EnumeratedType extends GrokedThing {
  /**
   * The list of possible values of the `ENUMERATED` type.
   */
  items?: EnumerationItem[];
  /**
   * Whether the `ENUMERATED` is explicitly extensible.
   */
  explicitlyExtensible?: boolean;
  /**
   * A value describing what is to be done if an unrecognized enumeration value
   * is encountered.
   */
  exception?: ExceptionIdentification;
  /**
   * Whether the `ENUMERATED` was defined without using the `DefinedValue`
   * production. If `true`, it means that there are no additional lookups
   * needed to resolve the numeric values of the named numbers.
   */
  selfContained?: boolean;
  /**
   * Whether all items were explicitly numbered.
   */
  allItemsExplicitlyNumbered?: boolean;
}
