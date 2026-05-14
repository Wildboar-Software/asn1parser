import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `SimpleTableConstraint ::= ObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.SimpleTableConstraint, parserFor.ObjectSet)
);
