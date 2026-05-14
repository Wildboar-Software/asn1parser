import { optional, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import * as parserFor from '../specific/index.js';

/**
 * `ValueConstraint ::= Constraint | empty`
 */
export default recursiveParser((): Parser => optional(parserFor.Constraint));
