import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `CharsDefn ::= cstring | Quadruple | Tuple | DefinedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.cstring),
        parserFor.Quadruple,
        parserFor.Tuple,
        parserFor.DefinedValue,
      ],
      ProductionType.CharsDefn
    )
);
