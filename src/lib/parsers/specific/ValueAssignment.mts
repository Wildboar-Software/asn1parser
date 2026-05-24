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
 * `ValueAssignment ::= valuereference Type "::=" Value`
 */
export const ValueAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueAssignment, [
      parserFor.valuereference,
      doif(parserFor.Type, updateCurrentType),
      literal(ProductionType.assignment),
      Value,
    ])
);
export default ValueAssignment;
