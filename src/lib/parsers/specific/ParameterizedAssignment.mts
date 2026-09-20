import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `ParameterizedAssignment ::=
 *      ParameterizedTypeAssignment
 *      | ParameterizedValueAssignment
 *      | ParameterizedValueSetTypeAssignment
 *      | ParameterizedObjectClassAssignment
 *      | ParameterizedObjectAssignment
 *      | ParameterizedObjectSetAssignment`
 *
 * `ParameterizedObjectSetAssignment` is attempted before
 * `ParameterizedValueSetTypeAssignment` so `Name {P} OPERATION ::= {}` is
 * not stolen by `ValueSetInAssignment`. That mirrors `Assignment`, where
 * `ObjectSetAssignment` is tried before `ValueSetTypeAssignment`.
 */
export const ParameterizedAssignment: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedTypeAssignment,
        parserFor.ParameterizedValueAssignment,
        parserFor.ParameterizedObjectClassAssignment,
        parserFor.ParameterizedObjectAssignment,
        parserFor.ParameterizedObjectSetAssignment,
        parserFor.ParameterizedValueSetTypeAssignment,
      ],
      ProductionType.ParameterizedAssignment
    )
);
export default ParameterizedAssignment;
