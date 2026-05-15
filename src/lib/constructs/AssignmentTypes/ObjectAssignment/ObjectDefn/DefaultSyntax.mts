import { type Setting } from '../Setting.mjs';
import type Production from '../../../../Production.mjs';

/**
 * The default syntax for an ASN.1 information object.
 * 
 * ```bnf
 * DefaultSyntax ::= "{" FieldSetting "," * "}"
 * FieldSetting ::= PrimitiveFieldName Setting
 * ```
 * 
 * This syntax is rarely used in practice, but this parser has features to
 * normalize objects using the defined syntax into equivalent objects using
 * the default syntax for the purposes of matching up settings to fields.
 * 
 * This production looks like this:
 * 
 * ```asn1
 * securityPolicy1 SECURITY-POLICY ::= {
 *    &id id-secpol1,
 *    &clearanceLevel 5
 * }
 * ```
 */
export type DefaultSyntax = {
  fieldSettings: {
    [PrimitiveFieldName: string]: Setting;
  };
  fieldProductions?: {
    [PrimitiveFieldName: string]: Production;
  };
};
