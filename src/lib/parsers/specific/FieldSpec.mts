import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import * as optimizedParserFor from '../optimized/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FieldSpec ::=
 *      TypeFieldSpec
 *      | FixedTypeValueFieldSpec
 *      | VariableTypeValueFieldSpec
 *      | FixedTypeValueSetFieldSpec
 *      | VariableTypeValueSetFieldSpec
 *      | ObjectFieldSpec
 *      | ObjectSetFieldSpec`
 */
export const FieldSpec: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectFieldSpec, // objectfieldreference DefinedObjectClass ObjectOptionalitySpec?
        parserFor.ObjectSetFieldSpec, // objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?
        parserFor.VariableTypeValueFieldSpec, // valuefieldreference FieldName ValueOptionalitySpec ?

        /**
         * The Type Alternative ObjectClassFieldType needs to be read before the
         * ObjectFieldSpec alternative gets read.
         */
        whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueFieldSpec, [
          parserFor.valuefieldreference,
          parserFor.Type,
          literal(ProductionType._UNIQUE),
          parserFor.ValueOptionalitySpec,
        ]),
        whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueFieldSpec, [
          parserFor.valuefieldreference,
          optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
          parserFor.ValueOptionalitySpec,
        ]),
        whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueFieldSpec, [
          parserFor.valuefieldreference,
          parserFor.Type,
          literal(ProductionType._UNIQUE),
        ]),
        whitespaceTolerantSequenceOf(ProductionType.FixedTypeValueFieldSpec, [
          parserFor.valuefieldreference,
          optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
        ]),
        whitespaceTolerantSequenceOf(ProductionType.ObjectFieldSpec, [
          parserFor.objectfieldreference,
          parserFor.DefinedObjectClass,
        ]),

        /**
         * The Type Alternative ObjectClassFieldType needs to be read before the
         * ObjectFieldSpec alternative gets read.
         */
        whitespaceTolerantSequenceOf(
          ProductionType.FixedTypeValueSetFieldSpec,
          [
            parserFor.valuesetfieldreference,
            optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
            parserFor.ValueSetOptionalitySpec,
          ]
        ),
        whitespaceTolerantSequenceOf(
          ProductionType.FixedTypeValueSetFieldSpec,
          [
            parserFor.valuesetfieldreference,
            optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
          ]
        ),
        whitespaceTolerantSequenceOf(ProductionType.ObjectSetFieldSpec, [
          parserFor.objectsetfieldreference,
          parserFor.DefinedObjectClass,
        ]),

        parserFor.FixedTypeValueFieldSpec, // valuefieldreference Type UNIQUE ? ValueOptionalitySpec ?
        parserFor.VariableTypeValueSetFieldSpec, // valuesetfieldreference FieldName ValueSetOptionalitySpec?
        parserFor.FixedTypeValueSetFieldSpec, // valuesetfieldreference Type ValueSetOptionalitySpec ?
        parserFor.TypeFieldSpec, // typefieldreference TypeOptionalitySpec?
      ],
      ProductionType.FieldSpec
    )
);
export default FieldSpec;
