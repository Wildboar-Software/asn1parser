import {
  doif,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import Value from '../optimized/Value_listens_to_currentType.mjs';
import updateCurrentType from '../../updateCurrentType.mjs';

/**
 * `OpenTypeFieldVal ::= Type ":" Value`
 */
export const OpenTypeFieldVal: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.OpenTypeFieldVal, [
      doif(parserFor.Type, updateCurrentType),
      literal(ProductionType.colon),
      Value,
    ])
);
export default OpenTypeFieldVal;
