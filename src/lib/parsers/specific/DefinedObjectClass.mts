import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DefinedObjectClass ::= ExternalObjectClassReference | objectclassreference | UsefulObjectClassReference`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.UsefulObjectClassReference,
        parserFor.ExternalObjectClassReference,
        literal(ProductionType.objectclassreference),
      ],
      ProductionType.DefinedObjectClass
    )
);
