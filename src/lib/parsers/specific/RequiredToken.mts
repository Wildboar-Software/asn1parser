import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RequiredToken ::= Literal | PrimitiveFieldName`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Literal, parserFor.PrimitiveFieldName],
      ProductionType.RequiredToken
    )
);
