import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectClassFieldType ::= DefinedObjectClass "." FieldName`
 */
export const ObjectClassFieldType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectClassFieldType, [
      parserFor.DefinedObjectClass,
      literal(ProductionType.period),
      /**
       * Note that the case-insensitive FieldName must be used, because the
       * ObjectClassFieldType can extract types from fixed-type and variable-type
       * values and value sets as well as type fields.
       */
      parserFor.FieldName,
    ])
);
export default ObjectClassFieldType;
