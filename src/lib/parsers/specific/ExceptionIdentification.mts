import {
  choiceOf,
  doif,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import Value from '../optimized/Value_listens_to_currentType.mjs';
import updateCurrentType from '../../updateCurrentType.mjs';

/**
 * `ExceptionIdentification ::= SignedNumber | DefinedValue | Type ":" Value`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      aliasFor(ProductionType.ExceptionIdentification, parserFor.SignedNumber),
      aliasFor(ProductionType.ExceptionIdentification, parserFor.DefinedValue),
      whitespaceTolerantSequenceOf(ProductionType.ExceptionIdentification, [
        doif(parserFor.Type, updateCurrentType),
        literal(ProductionType.colon),
        Value,
      ]),
    ])
);
