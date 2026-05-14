import {
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
      ProductionType.Enumerations,
      [parserFor.RootEnumeration],
      [
        optional(whitespace),
        literal(ProductionType.comma),
        optional(whitespace),
        parserFor.ellipsis,
        optional(whitespace),
        parserFor.ExceptionSpec,
      ],
      [
        optional(whitespace),
        literal(ProductionType.comma),
        optional(whitespace),
        parserFor.AdditionalEnumeration,
      ]
    )
);
