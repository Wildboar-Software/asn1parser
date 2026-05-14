import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import FieldName from '../optimized/FieldName_UppercasedFinalPrimitiveFieldName.mjs';

/**
 * `ObjectSetFromObjects ::= ReferencedObjects "." FieldName`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSetFromObjects, [
      parserFor.ReferencedObjects,
      literal(ProductionType.period),
      FieldName,
    ])
);
