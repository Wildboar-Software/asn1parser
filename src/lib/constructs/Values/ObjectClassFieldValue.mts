import { type FixedTypeFieldVal } from './FixedTypeFieldVal.mjs';
import type OpenTypeFieldVal from './OpenTypeFieldVal.mjs';

/**
 * An ASN.1 value corresponding to a type taken from an information object.
 * 
 * ```bnf
 * ObjectClassFieldValue ::= OpenTypeFieldVal | FixedTypeFieldVal
 * ```
 */
export type ObjectClassFieldValue = FixedTypeFieldVal | OpenTypeFieldVal;
