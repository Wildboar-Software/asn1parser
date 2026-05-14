import {
  aliasFor,
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
