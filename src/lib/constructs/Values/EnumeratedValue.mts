import type GrokedThing from '../../interfaces/GrokedThing.mjs';

export default interface EnumeratedValue extends GrokedThing {
  /** Identifier of the `ENUMERATED` value. */
  identifier: string;
  /** Name of the `ENUMERATED` type, if known. */
  enumIdentifier?: string;
}
