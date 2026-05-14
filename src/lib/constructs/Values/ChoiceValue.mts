import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Value } from '../Value.js';

// 29.12 "Value" or "XMLValue" shall be a notation for a value of the type in the "AlternativeTypeLists" that is named
// by the "identifier".

export default interface ChoiceValue extends GrokedThing {
  identifier: string;
  value: Value;
}
