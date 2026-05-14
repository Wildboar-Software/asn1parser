import {
  anything,
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
