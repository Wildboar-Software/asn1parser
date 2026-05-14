import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ComponentConstraint ::= ValueConstraint PresenceConstraint`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ComponentConstraint, [
      parserFor.ValueConstraint,
      parserFor.PresenceConstraint,
    ])
);
