import type GrokedThing from '../interfaces/GrokedThing.mjs';

/**
 * A coordinate of four numbers identifying a Unicode code point.
 * 
 * ```bnf
 * Quadruple ::= "{" Group "," Plane "," Row "," Cell "}"
 * ```
 */
export default interface Quadruple extends GrokedThing {
  group: number;
  plane: number;
  row: number;
  cell: number;
}
