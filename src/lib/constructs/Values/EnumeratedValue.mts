import type GrokedThing from '../../interfaces/GrokedThing.js';

export default interface EnumeratedValue extends GrokedThing {
  identifier: string;
  enumIdentifier?: string;
}
