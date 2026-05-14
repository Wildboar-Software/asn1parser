import {
  aliasFor,
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TypeFieldSpec ::= typefieldreference TypeOptionalitySpec?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.TypeFieldSpec, [
        parserFor.typefieldreference,
        parserFor.TypeOptionalitySpec,
      ]),
      aliasFor(ProductionType.TypeFieldSpec, parserFor.typefieldreference),
    ])
);
