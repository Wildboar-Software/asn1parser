import {
  literal,
  recursiveParser,
  commaDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefaultSyntax ::= "{" FieldSetting "," * "}"`
 */
export const DefaultSyntax: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefaultSyntax, [
      literal(ProductionType.curlyOpening),
      commaDelimitedList(ProductionType.FieldSetting, parserFor.FieldSetting),
      literal(ProductionType.curlyClosing),
    ])
);
export default DefaultSyntax;
