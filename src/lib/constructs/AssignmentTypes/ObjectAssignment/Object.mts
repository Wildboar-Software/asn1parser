import type DefinedObject from '../../Defined.mjs';
import { type ObjectDefn } from './ObjectDefn.mjs';
import type ObjectFromObject from './ObjectFromObject.mjs';

/**
 * An ASN.1 information object, or a reference to one.
 * 
 * ```bnf
 * Object ::= DefinedObject | ObjectDefn | ObjectFromObject | ParameterizedObject
 * ```
 */
export type Object_ = DefinedObject | ObjectDefn | ObjectFromObject;
