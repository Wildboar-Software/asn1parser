import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `IntegerType ::= INTEGER | INTEGER "{" NamedNumberList "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.IntegerType, [
        literal(ProductionType._INTEGER),
        literal(ProductionType.curlyOpening),
        assert(
          parserFor.NamedNumberList,
          literal(ProductionType.curlyClosing),
          'B5790B7E-C762-4A62-BFCE-27FF627958F5'
        ),
        assert(
          literal(ProductionType.curlyClosing),
          anything,
          '50FA1C60-D527-450C-822D-CD67406AEF0D'
        ),
      ]),
      aliasFor(ProductionType.IntegerType, literal(ProductionType._INTEGER)),
    ])
);
