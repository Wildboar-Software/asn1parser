import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExceptionSpec ::= "!" ExceptionIdentification | empty`
 */
export const ExceptionSpec: Parser = recursiveParser(
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
export default ExceptionSpec;
