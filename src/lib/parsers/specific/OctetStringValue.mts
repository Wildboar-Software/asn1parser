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
 * `OctetStringValue ::= bstring | hstring | CONTAINING Value`
 */
export const OctetStringValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      literal(ProductionType.bstring, ProductionType.OctetStringValue),
      literal(ProductionType.hstring, ProductionType.OctetStringValue),
      whitespaceTolerantSequenceOf(ProductionType.OctetStringValue, [
        literal(ProductionType._CONTAINING),
        assert(
          parserFor.Value,
          anything,
          '9898AFEB-9938-44A4-A5C7-2CCAA8F8152C'
        ),
      ]),
    ])
);
export default OctetStringValue;
