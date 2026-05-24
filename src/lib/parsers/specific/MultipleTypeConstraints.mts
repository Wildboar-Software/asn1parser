import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `MultipleTypeConstraints ::= FullSpecification | PartialSpecification`
 */
export const MultipleTypeConstraints: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.FullSpecification, parserFor.PartialSpecification],
      ProductionType.MultipleTypeConstraints
    )
);
export default MultipleTypeConstraints;
