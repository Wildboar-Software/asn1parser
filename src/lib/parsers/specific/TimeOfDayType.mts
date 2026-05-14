import { literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TimeOfDayType ::= TIME-OF-DAY`
 */
export default recursiveParser(
  (): Parser =>
    literal(ProductionType._TIME_OF_DAY, ProductionType.TimeOfDayType)
);
