import { literal, recursiveParser, commaDelimitedList } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `IdentifierList ::= identifier | IdentifierList identifier`
 */
export const IdentifierList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.IdentifierList,
      literal(ProductionType.identifier)
    )
);
export default IdentifierList;
