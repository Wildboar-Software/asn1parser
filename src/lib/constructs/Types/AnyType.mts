import type GrokedThing from '../../interfaces/GrokedThing.js';

/**
 * `AnyType ::= ANY | ANY DEFINED BY identifier`
 */
export default interface AnyType extends GrokedThing {
  definedBy?: string;
}
