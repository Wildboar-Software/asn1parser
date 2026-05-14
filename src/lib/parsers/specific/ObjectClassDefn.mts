import {
  commaDelimitedList,
  literal,
  optional,
  whitespace,
  recursiveParser,
  recyclingSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
