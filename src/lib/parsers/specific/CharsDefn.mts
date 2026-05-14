import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
