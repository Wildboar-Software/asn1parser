import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Value } from '../Value.js';

// BitStringValue ::=
//     bstring
// 	| hstring
// 	| "{" IdentifierList "}"
// 	| "{" "}"
// 	| CONTAINING Value

export default interface BitStringValue extends GrokedThing {
  bstring?: string;
  hstring?: string;
  identifiers?: string[];
  containing?: Value;
}
