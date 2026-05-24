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

export const AlternativeTypeLists: Parser = recursiveParser(
  (): Parser =>
    recyclingSequenceOf(
      ProductionType.AlternativeTypeLists,
      [parserFor.RootAlternativeTypeList],
      [
        optional(whitespace),
        literal(ProductionType.comma),
        optional(whitespace),
        parserFor.ExtensionAndException,
        optional(whitespace),
        parserFor.ExtensionAdditionAlternatives,
        optional(whitespace),
        parserFor.OptionalExtensionMarker,
      ]
    )
);
export default AlternativeTypeLists;
