import type GrokedThing from '../interfaces/GrokedThing.js';

/**
 * `Quadruple ::= "{" Group "," Plane "," Row "," Cell "}"`
 */
export default interface Quadruple extends GrokedThing {
  group: number;
  plane: number;
  row: number;
  cell: number;
}
