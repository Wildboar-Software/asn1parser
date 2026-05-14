import { literal, recursiveParser, commaDelimitedList } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `IdentifierList ::= identifier | IdentifierList identifier`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.IdentifierList,
      literal(ProductionType.identifier)
    )
);
