import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EncodingControlSection ::= ENCODING-CONTROL encodingreference EncodingInstructionAssignmentList`
 */
export const EncodingControlSection: Parser = recursiveParser(
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
export default EncodingControlSection;
