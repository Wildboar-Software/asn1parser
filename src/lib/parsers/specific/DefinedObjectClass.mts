import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinedObjectClass ::= ExternalObjectClassReference | objectclassreference | UsefulObjectClassReference`
 */
export const DefinedObjectClass: Parser = recursiveParser(
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
export default DefinedObjectClass;
