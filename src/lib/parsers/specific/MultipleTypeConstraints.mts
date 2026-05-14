import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `MultipleTypeConstraints ::= FullSpecification | PartialSpecification`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.FullSpecification, parserFor.PartialSpecification],
      ProductionType.MultipleTypeConstraints
    )
);
