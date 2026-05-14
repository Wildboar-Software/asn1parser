import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from './index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NameAndNumberForm ::= identifier "(" NumberForm ")"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NameAndNumberForm, [
      literal(ProductionType.identifier),
      literal(ProductionType.parenthesisOpening),
      parserFor.NumberForm,
      literal(ProductionType.parenthesisClosing),
    ])
);
