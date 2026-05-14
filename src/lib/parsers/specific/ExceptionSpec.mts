import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExceptionSpec ::= "!" ExceptionIdentification | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.ExceptionSpec, [
        literal(ProductionType.exclamationPoint),
        assert(
          parserFor.ExceptionIdentification,
          literal(ProductionType.parenthesisClosing),
          '1C8CFC77-08D3-41A3-9D9C-3547BD3DE2F7'
        ),
      ])
    )
);
