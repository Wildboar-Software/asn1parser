import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Value } from '../Value.mjs';

/**
 * An ASN.1 `OCTET STRING` value.
 * 
 * ```bnf
 * OctetStringValue ::= bstring | hstring | CONTAINING Value
 * ```
 */
export default interface OctetStringValue extends GrokedThing {
  /**
   * The binary digits of the `OCTET STRING`, if presented using the `bstring`
   * production. Example: `01010101`.
   */
  bstring?: string;
  /**
   * The hexadecimal digits of the `OCTET STRING`, if presented using the `hstring`
   * production. Example: `A1B2C3D4`.
   */
  hstring?: string;
  /**
   * The value of the `OCTET STRING`, if presented using the `CONTAINING` production.
   * This is used when the `OCTET STRING` itself contains an encoding of something.
   */
  containing?: Value;
}
