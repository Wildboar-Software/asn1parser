import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * Note that the Reference definition is not implemented below to prevent
 * infinite recursion, because a ParameterizedReference is defined as a
 * Reference, and vice versa. In this library, a reference followed by curly
 * brackets will be identified as a `ParameterizedReference` and one without
 * will be defined as a `Reference`, even though it could also be a
 * `ParameterizedReference`.
 *
 * `ParameterizedReference ::=
 *     Reference
 *     | Reference "{"  "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedReference, [
      choiceOf(
        [
          parserFor.valuereference,
          literal(ProductionType.objectclassreference),
          parserFor.objectreference,
          parserFor.objectsetreference,
        ],
        ProductionType.Reference
      ),
      literal(ProductionType.curlyOpening),
      literal(ProductionType.curlyClosing),
    ])
);
