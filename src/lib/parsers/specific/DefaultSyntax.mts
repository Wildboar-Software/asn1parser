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
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefaultSyntax, [
      literal(ProductionType.curlyOpening),
      commaDelimitedList(ProductionType.FieldSetting, parserFor.FieldSetting), // FIXME:
      literal(ProductionType.curlyClosing),
    ])
);
