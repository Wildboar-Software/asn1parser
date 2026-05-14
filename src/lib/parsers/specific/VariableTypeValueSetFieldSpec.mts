import {
  choiceOf,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import FieldName from '../optimized/FieldName_UppercasedFinalPrimitiveFieldName.mjs';

/**
 * `VariableTypeValueSetFieldSpec ::= valuesetfieldreference FieldName ValueSetOptionalitySpec?`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(
        ProductionType.VariableTypeValueSetFieldSpec,
        [
          parserFor.valuesetfieldreference,
          /**
           * From ITU X.681, Section 9.8:
           *
           * "The "FieldName" (see 9.14), which is relative to the class being
           * specified, shall be that of a type field..."
           *
           * This means it must end with an uppercased final `PrimitiveFieldName`.
           */
          FieldName,
          parserFor.ValueSetOptionalitySpec,
        ]
      ),
      whitespaceTolerantSequenceOf(
        ProductionType.VariableTypeValueSetFieldSpec,
        [
          parserFor.valuesetfieldreference,
          /**
           * From ITU X.681, Section 9.8:
           *
           * "The "FieldName" (see 9.14), which is relative to the class being
           * specified, shall be that of a type field..."
           *
           * This means it must end with an uppercased final `PrimitiveFieldName`.
           */
          FieldName,
        ]
      ),
    ])
);
