import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from './index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
