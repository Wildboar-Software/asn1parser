import {
  aliasFor,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import * as optimizedParserFor from '../optimized/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

// How do you differentiate a value
/**
 * `Assignment ::=
 *      TypeAssignment
 *      | ValueAssignment
 *      | XMLValueAssignment
 *      | ValueSetTypeAssignment
 *      | ObjectClassAssignment
 *      | ObjectAssignment
 *      | ObjectSetAssignment
 *      | ParameterizedAssignment`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        /**
         * NOTE 06e527f8-874e-4374-a027-a4264b77a619:
         * If the identifier is a single character, a `TypeAssignment` could be
         * mistaken for an `ObjectClassAssignment` if the `Type` alternative is
         * an `ObjectClassFieldType`. Prior to this addition, the parser would read
         * the subsequent `DefinedObjectClass`, then quit, leaving it expecting a
         * new `Assignment`, but receiving a period followed by a `FieldName`.
         */
        whitespaceTolerantSequenceOf(ProductionType.TypeAssignment, [
          parserFor.typereference,
          literal(ProductionType.assignment),
          optimizedParserFor.ObjectClassFieldTypeWithOptionalConstraints,
        ]),
        /**
         * This is to make the parser less likely to confuse a TypeAssignment for
         * an ObjectClassAssignment, as was the case with this production:
         *
         * ID ::= XSD.String(SIZE (1..32))
         *
         * ...from `X0-0-22-crs`.
         */
        whitespaceTolerantSequenceOf(ProductionType.TypeAssignment, [
          parserFor.typereference,
          literal(ProductionType.assignment),
          aliasFor(ProductionType.Type, parserFor.ConstrainedType),
        ]),
        parserFor.ObjectSetAssignment,
        parserFor.ObjectClassAssignment,
        parserFor.TypeAssignment,
        /**
         * This alternative must appear in front of `ObjectAssignment` so that
         * ObjectIdentifierValue assignments whose type has a name in all-caps does
         * not get interpreted as an object assignment. This is a problem with
         * X.501 UsefulDefinitions.asn1.
         */
        whitespaceTolerantSequenceOf(ProductionType.ValueAssignment, [
          parserFor.valuereference,
          aliasFor(ProductionType.Type, parserFor.ReferencedType),
          literal(ProductionType.assignment),
          aliasFor(
            ProductionType.Value,
            aliasFor(
              ProductionType.BuiltinValue,
              parserFor.ObjectIdentifierValue
            )
          ),
        ]),
        parserFor.ObjectAssignment, // I think this is a stricter subset of ValueAssignment.
        parserFor.ValueAssignment,
        parserFor.XMLValueAssignment,
        parserFor.ValueSetTypeAssignment,
        parserFor.ParameterizedAssignment,
      ],
      ProductionType.Assignment
    )
);
