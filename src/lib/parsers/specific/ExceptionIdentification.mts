import {
  choiceOf,
  doif,
  literal,
  recursiveParser,
  aliasFor,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import Value from '../optimized/Value_listens_to_currentType.js';
import updateCurrentType from '../../updateCurrentType.js';

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
