import type GrokedThing from '../interfaces/GrokedThing.mjs';

/**
 * `Tuple ::= "{" TableColumn "," TableRow "}"`
 */
export default interface Tuple extends GrokedThing {
  column: number;
  row: number;
}
