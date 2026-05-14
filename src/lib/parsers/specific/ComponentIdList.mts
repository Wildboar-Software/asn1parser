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
export default recursiveParser(
  (): Parser =>
    periodDelimitedList(
      ProductionType.ComponentIdList,
      literal(ProductionType.identifier)
    )
);
