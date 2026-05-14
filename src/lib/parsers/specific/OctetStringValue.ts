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
 * `OctetStringValue ::= bstring | hstring | CONTAINING Value`
 */
export default recursiveParser(
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
