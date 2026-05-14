import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SequenceType ::=
 *      SEQUENCE "{" "}"
 *      | SEQUENCE "{" ExtensionAndException OptionalExtensionMarker "}"
 *      | SEQUENCE "{" ComponentTypeLists "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.SequenceType, [
        literal(ProductionType._SEQUENCE),
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SequenceType, [
        literal(ProductionType._SEQUENCE),
        literal(ProductionType.curlyOpening),
        parserFor.ExtensionAndException,
        parserFor.OptionalExtensionMarker,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SequenceType, [
        literal(ProductionType._SEQUENCE),
        literal(ProductionType.curlyOpening),
        parserFor.ComponentTypeLists,
        assert(
          literal(ProductionType.curlyClosing),
          anything,
          'C5649A40-D1DC-4EE8-BC79-E8B39037708B'
        ),
      ]),
    ])
);
