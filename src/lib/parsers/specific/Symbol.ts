import choiceOf from '../generic/choiceOf.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * Note that the Reference definition is not implemented below to prevent
 * infinite recursion, because a ParameterizedReference is defined as a
 * Reference, and vice versa. In this library, a reference followed by curly
 * brackets will be identified as a `ParameterizedReference` and one without
 * will be defined as a `Reference`, even though it could also be a
 * `ParameterizedReference`.
 *
 * `ParameterizedReference ::= Reference | Reference "{"  "}"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ParameterizedReference, parserFor.Reference],
      ProductionType.Symbol
    )
);
