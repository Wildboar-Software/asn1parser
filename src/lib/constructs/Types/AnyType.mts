import type GrokedThing from '../../interfaces/GrokedThing.mjs';

/**
 * `AnyType ::= ANY | ANY DEFINED BY identifier`
 */
export default interface AnyType extends GrokedThing {
  definedBy?: string;
}
