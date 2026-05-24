import { commaDelimitedList, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TextList ::= identifier | TextList "," identifier`
 */
export const TextList: Parser = recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.TextList,
      literal(ProductionType.identifier)
    )
);
export default TextList;
