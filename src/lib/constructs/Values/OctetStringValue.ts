import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Value } from '../Value.js';

/**
 * `OctetStringValue ::= bstring | hstring | CONTAINING Value`
 */
export default interface OctetStringValue extends GrokedThing {
  bstring?: string;
  hstring?: string;
  containing?: Value;
}
