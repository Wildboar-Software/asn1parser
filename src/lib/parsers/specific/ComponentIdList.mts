import {
  literal,
  recursiveParser,
  periodDelimitedList,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ComponentIdList ::= identifier "." +`
 */
export const ComponentIdList: Parser = recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.ComponentIdList,
      literal(ProductionType.identifier)
    )
);
export default ComponentIdList;
