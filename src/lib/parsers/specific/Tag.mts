import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Tag ::= "[" EncodingReference Class ClassNumber "]"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.Tag, [
      literal(ProductionType.squareOpening),
      parserFor.EncodingReference,
      parserFor.Class,
      parserFor.ClassNumber,
      assert(
        literal(ProductionType.squareClosing),
        anything,
        'EBDCF680-EB05-4A86-8FD7-79A3FE923774'
      ),
    ])
);
