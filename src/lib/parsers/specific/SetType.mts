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
 * `SetType ::=
 *      SET "{" "}"
 *      | SET "{" ExtensionAndException OptionalExtensionMarker "}"
 *      | SET "{" ComponentTypeLists "}"`
 */
export const SetType: Parser = recursiveParser(
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
export default SetType;
