import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `ValueSetTypeAssignment ::= typereference Type "::=" ValueSet`
 *
 * Empty `{ }` / `{ ... }` value sets are accepted as a `ValueSet` so the
 * assignment can be consumed, then reported via `syntaxErrors`. `{ ... }`
 * is not a legal `ElementSetSpecs` (X.680); it is legal for object sets.
 */
export const ValueSetTypeAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueSetTypeAssignment, [
      parserFor.typereference,
      parserFor.Type,
      literal(ProductionType.assignment),
      parserFor.ValueSetInAssignment,
    ])
);
export default ValueSetTypeAssignment;
