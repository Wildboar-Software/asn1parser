import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectSetFieldSpec ::= objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ObjectSetFieldSpec, [
        parserFor.objectsetfieldreference,
        parserFor.DefinedObjectClass,
        parserFor.ObjectSetOptionalitySpec,
      ]),
      /**
       * This alternative was removed and deferred within `FieldSpec`, the only
       * production that uses this production, so that `FixedTypeValue*Spec` could
       * attempt to read an `ObjectClassFieldType` before attempting to read just
       * the `DefinedObjectClass` as the end of an `ObjectFieldSpec`.
       */
      // sequenceOf(ProductionType.ObjectSetFieldSpec, [
      //     parserFor.objectsetfieldreference,
      //     whitespace,
      //     parserFor.DefinedObjectClass,
      // ]),
    ])
);
