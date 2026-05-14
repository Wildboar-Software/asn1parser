import {
  doif,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import Value from '../optimized/Value_listens_to_currentType.js';
import updateCurrentType from '../../updateCurrentType.js';

/**
 * `ValueAssignment ::= valuereference Type "::=" Value`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueAssignment, [
      parserFor.valuereference,
      doif(parserFor.Type, updateCurrentType),
      literal(ProductionType.assignment),
      Value,
    ])
);
