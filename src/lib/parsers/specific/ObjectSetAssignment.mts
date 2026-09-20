import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `ObjectSetAssignment ::= objectsetreference DefinedObjectClass "::=" ObjectSet`
 *
 * Empty `{ }` is accepted as an `ObjectSet` so the assignment can be
 * consumed, then reported via `syntaxErrors`. `{ }` is not a legal
 * `ObjectSetSpec` (X.681); `{ ... }` is.
 */
export const ObjectSetAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSetAssignment, [
      parserFor.objectsetreference,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.ObjectSetInAssignment,
    ])
);
export default ObjectSetAssignment;
