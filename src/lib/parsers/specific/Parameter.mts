import {
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Parameter ::= ParamGovernor ":" DummyReference | DummyReference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.Parameter, [
        parserFor.ParamGovernor,
        literal(ProductionType.colon),
        parserFor.DummyReference,
      ]),
      aliasFor(ProductionType.Parameter, parserFor.DummyReference),
    ])
);
