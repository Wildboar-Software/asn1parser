import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Value } from '../Value.mjs';

/**
 * An ASN.1 `BIT STRING` value.
 * 
 * ```bnf
 * BitStringValue ::=
 *   bstring
 *   | hstring
 *   | "{" IdentifierList "}"
 *   | "{" "}" | CONTAINING Value
 * ```
 */
export default interface BitStringValue extends GrokedThing {
  /**
   * The 1s and 0s of the `BIT STRING`, if presented using the `bstring`
   * production. Example: `01010101`.
   */
  bstring?: string;
  /**
   * The hexadecimal digits of the `BIT STRING`, if presented using the `hstring`
   * production. Example: `A1B2C3D4`.
   */
  hstring?: string;
  /**
   * The identifiers of the `BIT STRING`, if presented using the `IdentifierList`
   * production. Example: `["keyEncipherment", "digitalSignature"]`.
   */
  identifiers?: string[];
  /**
   * The value of the `BIT STRING`, if presented using the `CONTAINING` production.
   * This is used when the `BIT STRING` itself contains an encoding of something.
   */
  containing?: Value;
}
