import {
  choiceOf,
  literal,
  optional,
  recursiveParser,
  aliasFor,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
