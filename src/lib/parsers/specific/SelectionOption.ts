import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import ProductionType from '../../ProductionType.js';
import type Parser from '../../Parser.js';
import * as parserFor from '../specific/index.js';

/**
 * Though this is permitted by the specification to be empty, it is
 * treated as required so that SymbolsFromModule can determine whether
 * to consume the whitespace before it.
 *
 * `SelectionOption ::= empty
 *     | WITH "SUCCESSORS"
 *     | WITH "DESCENDANTS"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SelectionOption, [
      literal(ProductionType._WITH),
      assert(
        choiceOf([
          literal(ProductionType._SUCCESSORS),
          literal(ProductionType._DESCENDANTS),
        ]),
        parserFor.SymbolsFromModule,
        '428A05E7-2B45-4E81-B7FE-DE267F04CEAD'
      ),
    ])
);
