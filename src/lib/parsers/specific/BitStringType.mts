import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `BitStringType ::= BIT STRING | BIT STRING "{" NamedBitList "}"`
 */
export const BitStringType: Parser = recursiveParser(
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
export default BitStringType;
