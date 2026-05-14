import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import FieldName from '../optimized/FieldName_UppercasedFinalPrimitiveFieldName.js';

/**
 * `VariableTypeValueFieldSpec ::= valuefieldreference FieldName ValueOptionalitySpec ?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.VariableTypeValueFieldSpec, [
        parserFor.valuefieldreference,
        /**
         * From ITU X.681, Section 9.8:
         *
         * "The "FieldName" (see 9.14), which is relative to the class being
         * specified, shall be that of a type field..."
         *
         * This means it must end with an uppercased final `PrimitiveFieldName`.
         */
        FieldName,
        parserFor.ValueOptionalitySpec,
      ]),
      whitespaceTolerantSequenceOf(ProductionType.VariableTypeValueFieldSpec, [
        parserFor.valuefieldreference,
        /**
         * From ITU X.681, Section 9.8:
         *
         * "The "FieldName" (see 9.14), which is relative to the class being
         * specified, shall be that of a type field..."
         *
         * This means it must end with an uppercased final `PrimitiveFieldName`.
         */
        FieldName,
      ]),
    ])
);
