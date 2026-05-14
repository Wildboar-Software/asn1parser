import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ReferencedValue ::= DefinedValue | ValueFromObject`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ValueFromObject, // `ValueFromObject ::= ReferencedObjects "." FieldName`
        parserFor.DefinedValue,
      ],
      ProductionType.ReferencedValue
    )
);
