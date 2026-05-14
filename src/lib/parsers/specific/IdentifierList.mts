import { literal, recursiveParser, commaDelimitedList } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
