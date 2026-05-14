import {
  literal,
  recursiveParser,
  periodDelimitedList,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ComponentIdList ::= identifier "." +`
 */
export default recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.ComponentIdList,
      literal(ProductionType.identifier)
    )
);
