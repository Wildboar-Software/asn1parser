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
 * `SelectionType ::= identifier "<" Type`
 */
export const SelectionType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SelectionType, [
      literal(ProductionType.identifier),
      literal(ProductionType.lessThan),
      assert(parserFor.Type, anything, '98394664-9B71-4015-85ED-0EA94A75963B'),
    ])
);
export default SelectionType;
