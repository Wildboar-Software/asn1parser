import choiceOf from '../generic/choiceOf.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

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
