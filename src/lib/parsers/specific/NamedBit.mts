import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NamedBit ::= identifier "(" number ")" | identifier "(" DefinedValue ")"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedBit, [
      literal(ProductionType.identifier),
      literal(ProductionType.parenthesisOpening),
      choiceOf([literal(ProductionType.number), parserFor.DefinedValue]),
      assert(
        literal(ProductionType.parenthesisClosing),
        anything,
        '3AA005AD-5831-4D44-ADAD-81568ECD2F04'
      ),
    ])
);
