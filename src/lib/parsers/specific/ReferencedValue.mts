import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
