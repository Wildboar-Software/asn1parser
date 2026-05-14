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
