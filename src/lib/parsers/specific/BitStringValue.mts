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
 * `BitStringValue ::= bstring | hstring | "{" IdentifierList "}" | "{" "}" | CONTAINING Value`
 */
export const BitStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      literal(ProductionType.bstring, ProductionType.BitStringValue),
      /**
       * The `BitStringValue` parser is only used in `BuiltinValue`. Since the
       * `hstring` production is held in common between `BitStringValue` and
       * `OctetStringValue`, it is only fair that we let `OctetStringValue` take
       * the `hstring`.
       */
      // literal(ProductionType.hstring, ProductionType.BitStringValue),
      whitespaceTolerantSequenceOf(ProductionType.BitStringValue, [
        // TODO: I think these two productions can be merged.
        literal(ProductionType.curlyOpening),
        parserFor.IdentifierList,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.BitStringValue, [
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.BitStringValue, [
        literal(ProductionType._CONTAINING),
        assert(
          parserFor.Value,
          whitespace,
          '8020C3EE-39EC-457E-B24D-3850A69B6056'
        ),
      ]),
    ])
);
export default BitStringValue;
