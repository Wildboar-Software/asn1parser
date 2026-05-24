import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SimpleTableConstraint ::= ObjectSet`
 */
export const SimpleTableConstraint: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.SimpleTableConstraint, parserFor.ObjectSet)
);
export default SimpleTableConstraint;
