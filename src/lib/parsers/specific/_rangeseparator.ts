import { literal, recursiveParser, sequenceOf } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `..`
 */
export default recursiveParser(
  (): Parser =>
    sequenceOf(ProductionType.rangeseparator, [
      literal(ProductionType.period),
      literal(ProductionType.period),
    ])
);
