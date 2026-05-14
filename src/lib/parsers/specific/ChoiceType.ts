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
 * `ChoiceType ::= CHOICE "{" AlternativeTypeLists "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ChoiceType, [
      literal(ProductionType._CHOICE),
      assert(
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
        '1BACDA56-63F6-4782-9BF5-95C3A58D2042'
      ),
      parserFor.AlternativeTypeLists,
      assert(
        literal(ProductionType.curlyClosing),
        literal(ProductionType.curlyClosing),
        '94697CBF-28CA-4531-9505-B867DB8DE04A'
      ),
    ])
);
