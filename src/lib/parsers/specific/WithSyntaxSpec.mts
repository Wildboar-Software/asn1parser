import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `WithSyntaxSpec ::= WITH SYNTAX SyntaxList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.WithSyntaxSpec, [
      literal(ProductionType._WITH),
      assert(
        literal(ProductionType._SYNTAX),
        parserFor.SyntaxList,
        '4C993138-E9EC-4B22-AAFF-26738BCCD68A'
      ),
      assert(
        parserFor.SyntaxList,
        anything,
        '0515C14A-2A31-48AB-BD79-972FF7E126CD'
      ),
    ])
);
