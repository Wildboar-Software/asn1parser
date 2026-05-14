import {
  choiceOf,
  literal,
  optional,
  recursiveParser,
  aliasFor,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLBitStringValue ::= XMLTypedValue | xmlbstring | XMLIdentifierList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      choiceOf([
        aliasFor(ProductionType.XMLBitStringValue, parserFor.XMLTypedValue),
        aliasFor(
          ProductionType.XMLBitStringValue,
          literal(ProductionType.xmlbstring)
        ),
        aliasFor(ProductionType.XMLBitStringValue, parserFor.XMLIdentifierList),
      ])
    )
);
