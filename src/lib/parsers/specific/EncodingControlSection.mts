import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EncodingControlSection ::= ENCODING-CONTROL encodingreference EncodingInstructionAssignmentList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EncodingControlSection, [
      literal(ProductionType._ENCODING_CONTROL),
      assert(
        parserFor.encodingreference,
        literal(ProductionType._END),
        '263DD5F0-2F26-4D70-9697-6620EF5ED6C3'
      ),
      parserFor.EncodingInstructionAssignmentList,
    ])
);
