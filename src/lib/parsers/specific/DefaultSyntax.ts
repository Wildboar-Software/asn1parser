import {
  literal,
  recursiveParser,
  commaDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
