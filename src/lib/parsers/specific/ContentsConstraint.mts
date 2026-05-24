import {
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
 * `ContentsConstraint ::= CONTAINING Type | ENCODED BY Value | CONTAINING Type ENCODED BY Value`
 */
export const ContentsConstraint: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ContentsConstraint, [
        literal(ProductionType._CONTAINING),
        parserFor.Type,
        literal(ProductionType._ENCODED),
        assert(
          literal(ProductionType._BY),
          parserFor.Value,
          '16AAB547-ABC9-4805-AA61-1457B0BBB587'
        ),
        assert(
          parserFor.Value,
          literal(ProductionType.parenthesisClosing),
          '3EC2A2C8-A73F-4C4A-A6EE-FF3A02071FDD'
        ),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.ContentsConstraint, [
        literal(ProductionType._CONTAINING),
        assert(
          parserFor.Type,
          literal(ProductionType.parenthesisClosing),
          'F99088F1-7825-4E31-A968-BC1F819450D3'
        ),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.ContentsConstraint, [
        literal(ProductionType._ENCODED),
        literal(ProductionType._BY),
        assert(
          parserFor.Value,
          literal(ProductionType.parenthesisClosing),
          'F2F34DC1-1737-4CF1-A0A7-297DC2F31E6B'
        ),
      ]),
    ])
);
export default ContentsConstraint;
