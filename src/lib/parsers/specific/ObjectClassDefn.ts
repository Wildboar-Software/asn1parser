import {
  commaDelimitedList,
  literal,
  optional,
  whitespace,
  recursiveParser,
  recyclingSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

export default recursiveParser(
  (): Parser =>
    recyclingSequenceOf(
      ProductionType.ObjectClassDefn,
      [literal(ProductionType._CLASS)],
      [
        optional(whitespace),
        literal(ProductionType.curlyOpening),
        optional(whitespace),
        commaDelimitedList(ProductionType.FieldSpec, parserFor.FieldSpec),
        optional(whitespace),
        literal(ProductionType.curlyClosing),
      ],
      [optional(whitespace), parserFor.WithSyntaxSpec]
    )
);
