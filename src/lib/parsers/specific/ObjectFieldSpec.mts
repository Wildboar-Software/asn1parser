import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectFieldSpec ::= objectfieldreference DefinedObjectClass ObjectOptionalitySpec?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.ObjectFieldSpec, [
        parserFor.objectfieldreference,
        parserFor.DefinedObjectClass,
        parserFor.ObjectOptionalitySpec,
      ]),
      /**
       * This alternative was removed and deferred within `FieldSpec`, the only
       * production that uses this production, so that `FixedTypeValue*Spec` could
       * attempt to read an `ObjectClassFieldType` before attempting to read just
       * the `DefinedObjectClass` as the end of an `ObjectFieldSpec`.
       */
      // sequenceOf(ProductionType.ObjectFieldSpec, [
      //     parserFor.objectfieldreference,
      //     whitespace,
      //     parserFor.DefinedObjectClass,
      // ]),
    ])
);
