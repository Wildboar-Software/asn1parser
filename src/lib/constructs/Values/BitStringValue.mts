import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Value } from '../Value.mjs';

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
