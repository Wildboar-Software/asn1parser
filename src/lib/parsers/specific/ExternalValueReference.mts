import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExternalValueReference ::= modulereference "." valuereference`
 */
export const ExternalValueReference: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExternalObjectSetReference, [
      parserFor.modulereference,
      literal(ProductionType.period),
      parserFor.valuereference,
    ])
);
export default ExternalValueReference;
