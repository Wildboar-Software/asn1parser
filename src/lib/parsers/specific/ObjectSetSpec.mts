import {
  aliasFor,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespace,
  whitespaceTolerantSequenceOf,
  recyclingSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import ElementSetSpec from '../optimized/ElementSetSpec_ObjectSet.mjs';

const RootElementSetSpec = recursiveParser(
  (): Parser => aliasFor(ProductionType.RootElementSetSpec, ElementSetSpec)
);

const AdditionalElementSetSpec = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.AdditionalElementSetSpec, ElementSetSpec)
);

export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ObjectSetSpec, [
        parserFor.ellipsis,
        literal(ProductionType.comma),
        AdditionalElementSetSpec,
      ]),
      aliasFor(ProductionType.ObjectSetSpec, parserFor.ellipsis),
      recyclingSequenceOf(
        ProductionType.ObjectSetSpec,
        [RootElementSetSpec],
        [
          optional(whitespace),
          literal(ProductionType.comma),
          optional(whitespace),
          parserFor.ellipsis,
        ],
        [
          optional(whitespace),
          literal(ProductionType.comma),
          optional(whitespace),
          AdditionalElementSetSpec,
        ]
      ),
    ])
);
