import { literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TimeOfDayType ::= TIME-OF-DAY`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._TIME_OF_DAY, ProductionType.TimeOfDayType)
);
