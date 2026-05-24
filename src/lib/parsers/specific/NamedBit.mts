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
 * `NamedBit ::= identifier "(" number ")" | identifier "(" DefinedValue ")"`
 */
export const NamedBit: Parser = recursiveParser(
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
export default NamedBit;
