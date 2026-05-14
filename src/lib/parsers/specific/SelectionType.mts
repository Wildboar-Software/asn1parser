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
 * `SelectionType ::= identifier "<" Type`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SelectionType, [
      literal(ProductionType.identifier),
      literal(ProductionType.lessThan),
      assert(parserFor.Type, anything, '98394664-9B71-4015-85ED-0EA94A75963B'),
    ])
);
