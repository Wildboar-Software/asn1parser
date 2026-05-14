import {
  assert,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionDefault ::= EXTENSIBILITY IMPLIED | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.ExtensionDefault, [
        literal(ProductionType._EXTENSIBILITY),
        assert(
          literal(ProductionType._IMPLIED),
          literal(ProductionType.assignment),
          'BBDB2C1B-E451-46C6-AF21-3AF0D546055F'
        ),
      ])
    )
);
