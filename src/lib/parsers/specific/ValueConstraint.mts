import { optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import * as parserFor from '../specific/index.mjs';

/**
 * `ValueConstraint ::= Constraint | empty`
 */
export const ValueConstraint: Parser = recursiveParser((): Parser => optional(parserFor.Constraint));
export default ValueConstraint;
