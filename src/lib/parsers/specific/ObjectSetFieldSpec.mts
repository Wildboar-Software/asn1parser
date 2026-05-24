import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectSetFieldSpec ::= objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?`
 */
export const ObjectSetFieldSpec: Parser = recursiveParser(
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
export default ObjectSetFieldSpec;
