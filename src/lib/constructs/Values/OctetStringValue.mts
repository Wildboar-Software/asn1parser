import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Value } from '../Value.mjs';

/**
 * `OctetStringValue ::= bstring | hstring | CONTAINING Value`
 */
export default interface OctetStringValue extends GrokedThing {
  bstring?: string;
  hstring?: string;
  containing?: Value;
}
