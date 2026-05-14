import { commaDelimitedList, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TextList ::= identifier | TextList "," identifier`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.TextList,
      literal(ProductionType.identifier)
    )
);
