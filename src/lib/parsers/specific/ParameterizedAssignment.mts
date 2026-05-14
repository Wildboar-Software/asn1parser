import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedAssignment ::=
 *      ParameterizedTypeAssignment
 *      | ParameterizedValueAssignment
 *      | ParameterizedValueSetTypeAssignment
 *      | ParameterizedObjectClassAssignment
 *      | ParameterizedObjectAssignment
 *      | ParameterizedObjectSetAssignment`
 */
export default recursiveParser(
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
