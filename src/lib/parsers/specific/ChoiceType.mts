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
 * `ChoiceType ::= CHOICE "{" AlternativeTypeLists "}"`
 */
export const ChoiceType: Parser = recursiveParser(
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
export default ChoiceType;
