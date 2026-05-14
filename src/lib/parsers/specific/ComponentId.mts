import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
