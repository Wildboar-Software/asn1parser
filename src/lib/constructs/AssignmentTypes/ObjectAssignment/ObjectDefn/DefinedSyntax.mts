import type GrokedThing from '../../../../interfaces/GrokedThing.mjs';
import { type Literal } from '../Literal.mjs';
import { type Setting } from '../Setting.mjs';

/**
 * The defined syntax for an ASN.1 information object.
 * ```bnf
 * DefinedSyntax ::= "{" DefinedSyntaxToken empty * "}"
 * DefinedSyntaxToken ::= Literal | Setting
 * ```
 * 
 * This syntax is used to define an information object with a specific syntax
 * defined for the whole object class. This is used to make object class
 * definitions more human-readable.
 * 
 * Here is an example of a defined syntax:
 * 
 * ```asn1
 * securityPolicy1 SECURITY-POLICY ::= {
 *    WITH IDENTIFIER id-secpol1,
 *    REQUIRING CLEARANCE LEVEL 5
 * }
 * ```
 * 
 * In the above case, `WITH`, `IDENTIFIER`, `REQUIRING`, `CLEARANCE`, and
 * `LEVEL` are literals, and `id-secpol1` and `5` are settings.
 */
export interface DefinedSyntax extends GrokedThing {
    /**
     * The tokens that make up the defined syntax.
     */
    tokens: (Literal | Setting)[];
}
