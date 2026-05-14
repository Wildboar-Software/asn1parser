import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `AbsoluteReference ::= "@" ModuleIdentifier "." ItemSpec`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.AbsoluteReference, [
      literal(ProductionType.atSign),
      parserFor.ModuleDefinition,
      literal(ProductionType.period),
      parserFor.ItemSpec,
    ])
);
