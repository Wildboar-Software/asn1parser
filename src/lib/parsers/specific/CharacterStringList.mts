import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `CharacterStringList ::= "{" CharSyms "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.CharacterStringList, [
      literal(ProductionType.curlyOpening),
      parserFor.CharSyms,
      literal(ProductionType.curlyClosing),
    ])
);
