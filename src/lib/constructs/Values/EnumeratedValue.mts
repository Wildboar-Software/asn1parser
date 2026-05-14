import type GrokedThing from '../../interfaces/GrokedThing.mjs';

export default interface EnumeratedValue extends GrokedThing {
  identifier: string;
  enumIdentifier?: string;
}
