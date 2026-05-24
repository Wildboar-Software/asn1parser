import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedAssignment ::=
 *      ParameterizedTypeAssignment
 *      | ParameterizedValueAssignment
 *      | ParameterizedValueSetTypeAssignment
 *      | ParameterizedObjectClassAssignment
 *      | ParameterizedObjectAssignment
 *      | ParameterizedObjectSetAssignment`
 */
export const ParameterizedAssignment: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedTypeAssignment,
        parserFor.ParameterizedValueAssignment,
        parserFor.ParameterizedValueSetTypeAssignment,
        parserFor.ParameterizedObjectClassAssignment,
        parserFor.ParameterizedObjectAssignment,
        parserFor.ParameterizedObjectSetAssignment,
      ],
      ProductionType.ParameterizedAssignment
    )
);
export default ParameterizedAssignment;
