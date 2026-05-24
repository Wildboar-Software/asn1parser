import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionAdditions ::= "," ExtensionAdditionList | empty`
 */
export const ExtensionAdditions: Parser = recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.ExtensionAdditions, [
        literal(ProductionType.comma),
        parserFor.ExtensionAdditionList,
      ])
    )
);
export default ExtensionAdditions;
