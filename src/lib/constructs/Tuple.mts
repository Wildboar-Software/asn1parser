import type GrokedThing from '../interfaces/GrokedThing.mjs';

/**
 * A coordinate of two numbers identifying a Unicode code point.
 * 
 * ```bnf
 * Tuple ::= "{" TableColumn "," TableRow "}"
 * ```
 */
export default interface Tuple extends GrokedThing {
  column: number;
  row: number;
}
