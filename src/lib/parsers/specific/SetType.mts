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
 * `SetType ::=
 *      SET "{" "}"
 *      | SET "{" ExtensionAndException OptionalExtensionMarker "}"
 *      | SET "{" ComponentTypeLists "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.SetType, [
        literal(ProductionType._SET),
        literal(ProductionType.curlyOpening),
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SetType, [
        literal(ProductionType._SET),
        literal(ProductionType.curlyOpening),
        parserFor.ExtensionAndException,
        parserFor.OptionalExtensionMarker,
        literal(ProductionType.curlyClosing),
      ]),
      whitespaceTolerantSequenceOf(ProductionType.SetType, [
        literal(ProductionType._SET),
        literal(ProductionType.curlyOpening),
        parserFor.ComponentTypeLists,
        assert(
          literal(ProductionType.curlyClosing),
          anything,
          'D8CFB7F5-46CB-4CE5-AA3E-0D79CAFCFF02'
        ),
      ]),
    ])
);
