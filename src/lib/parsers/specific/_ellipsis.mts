import { literal, recursiveParser, sequenceOf } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `...`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.ellipsis, [
      literal(ProductionType.period),
      literal(ProductionType.period),
      literal(ProductionType.period),
    ])
);
