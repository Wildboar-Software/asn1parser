import { commaDelimitedList, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TypeConstraints ::= NamedConstraint | NamedConstraint "," TypeConstraints`
 */
export default recursiveParser(
  (): Parser =>
    commaDelimitedList(
      ProductionType.TypeConstraints,
      parserFor.NamedConstraint
    )
);
