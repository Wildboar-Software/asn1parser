import { type DefaultSyntax } from './ObjectDefn/DefaultSyntax.mjs';
import { type DefinedSyntax } from './ObjectDefn/DefinedSyntax.mjs';

/**
 * An ASN.1 information object definition, using either the default syntax or
 * the syntax defined for that object class.
 * 
 * ```bnf
 * ObjectDefn ::= DefaultSyntax | DefinedSyntax
 * ```
 */
export type ObjectDefn = DefaultSyntax | DefinedSyntax;
