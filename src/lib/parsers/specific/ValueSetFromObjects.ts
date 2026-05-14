import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import FieldName from '../optimized/FieldName_UppercasedFinalPrimitiveFieldName.js';

/**
 * `ValueSetFromObjects ::= ReferencedObjects "." FieldName`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueSetFromObjects, [
      parserFor.ReferencedObjects,
      literal(ProductionType.period),
      FieldName,
    ])
);
