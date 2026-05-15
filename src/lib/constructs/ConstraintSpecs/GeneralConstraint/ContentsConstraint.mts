import { type Value } from '../../Value.mjs';
import { type Type } from '../../Type.mjs';
import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

/**
 * A constraint limiting how the contents within a `BIT STRING` or
 * `OCTET STRING` are to be encoded.
 */
interface JustContaining extends GrokedThing {
  containing: Type;
}

/**
 * A constraint limiting the contents within a `BIT STRING` or `OCTET STRING`
 * value to a specific value.
 */
interface JustEncodedBy extends GrokedThing {
  encodedBy: Value;
}

interface BothContainingAndEncodedBy extends JustContaining, JustEncodedBy {}

/**
 * A constraint limiting the contents within a `BIT STRING` or `OCTET STRING`
 * value.
 * 
 * ```bnf
 * ContentsConstraint ::=
 *     CONTAINING Type
 *   | ENCODED BY Value
 *   | CONTAINING Type ENCODED BY Value
 * ```
 */
export type ContentsConstraint =
  | JustContaining
  | JustEncodedBy
  | BothContainingAndEncodedBy;
