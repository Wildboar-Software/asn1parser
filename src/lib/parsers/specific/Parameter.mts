import {
  choiceOf,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
