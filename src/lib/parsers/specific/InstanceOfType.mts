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
 * `InstanceOfType ::= INSTANCE OF DefinedObjectClass`
 */
export const InstanceOfType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.InstanceOfType, [
      literal(ProductionType._INSTANCE),
      assert(
        literal(ProductionType._OF),
        parserFor.DefinedObjectClass,
        '47754181-E905-4BDD-B410-C51ABE58C806'
      ),
      assert(
        parserFor.DefinedObjectClass,
        anything,
        '1B9D64D2-99CC-4A17-87C3-7D3566129BC3'
      ),
    ])
);
export default InstanceOfType;
