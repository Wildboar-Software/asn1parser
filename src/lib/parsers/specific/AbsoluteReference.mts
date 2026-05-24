import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AbsoluteReference ::= "@" ModuleIdentifier "." ItemSpec`
 */
export const AbsoluteReference: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.AbsoluteReference, [
      literal(ProductionType.atSign),
      parserFor.ModuleDefinition,
      literal(ProductionType.period),
      parserFor.ItemSpec,
    ])
);
export default AbsoluteReference;
