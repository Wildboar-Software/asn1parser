import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
