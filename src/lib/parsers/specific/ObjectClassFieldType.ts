import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectClassFieldType ::= DefinedObjectClass "." FieldName`
 */
export default recursiveParser(
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
