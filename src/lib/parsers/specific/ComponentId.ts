import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ComponentId ::= identifier | number | "*"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      literal(ProductionType.identifier),
      literal(ProductionType.number),
      literal(ProductionType.asterisk),
    ])
);
