import {
  literal,
  optional,
  whitespace,
  recursiveParser,
  recyclingSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const Enumerations: Parser = recursiveParser(
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
export default Enumerations;
