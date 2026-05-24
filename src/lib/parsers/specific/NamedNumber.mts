import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NamedNumber ::= identifier "(" SignedNumber ")" | identifier "(" DefinedValue ")"`
 */
export const NamedNumber: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedNumber, [
      literal(ProductionType.identifier),
      literal(ProductionType.parenthesisOpening),
      choiceOf([parserFor.SignedNumber, parserFor.DefinedValue]),
      assert(
        literal(ProductionType.parenthesisClosing),
        anything,
        'DF3E3AD1-DE66-40F6-B4F4-A9AE6B79B8DB'
      ),
    ])
);
export default NamedNumber;
