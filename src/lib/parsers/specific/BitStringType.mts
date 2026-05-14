import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `BitStringType ::= BIT STRING | BIT STRING "{" NamedBitList "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.BitStringType, [
        literal(ProductionType._BIT),
        literal(ProductionType._STRING),
        literal(ProductionType.curlyOpening),
        parserFor.NamedBitList,
        assert(
          literal(ProductionType.curlyClosing),
          literal(ProductionType.curlyClosing),
          '8B97ECC4-47CF-4692-949D-D527A363B259'
        ),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.BitStringType, [
        literal(ProductionType._BIT),
        assert(
          literal(ProductionType._STRING),
          whitespace,
          'D8E238AB-868F-4AF6-BF2E-C403C522EA38'
        ),
      ]),
    ])
);
