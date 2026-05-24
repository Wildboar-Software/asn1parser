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
import ComponentType_NamedType from '../optimized/ComponentType_NamedType.mjs';

/**
 * This uses a custom parser to avoid wastefully re-reading `NamedType`.
 * Implementing this alone has halved parsing time for some files, with
 * even better performance improvements for other files.
 *
 * `ComponentType ::=
 *      NamedType
 *      | NamedType OPTIONAL
 *      | NamedType DEFAULT Value
 *      | COMPONENTS OF Type`
 */
export const ComponentType: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ComponentType, [
        literal(ProductionType._COMPONENTS),
        literal(ProductionType._OF),
        assert(
          parserFor.Type,
          anything,
          'DE15F191-2BCF-497C-9092-690935345ACA'
        ),
      ]),
      ComponentType_NamedType,
    ])
);
export default ComponentType;
