import type GrokedThing from '../interfaces/GrokedThing.js';

/**
 * `Tuple ::= "{" TableColumn "," TableRow "}"`
 */
export default interface Tuple extends GrokedThing {
  column: number;
  row: number;
}
