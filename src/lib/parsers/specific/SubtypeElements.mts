import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SubtypeElements ::=
 *      SingleValue
 *      | ContainedSubtype
 *      | ValueRange
 *      | PermittedAlphabet
 *      | SizeConstraint
 *      | TypeConstraint
 *      | InnerTypeConstraints
 *      | PatternConstraint
 *      | PropertySettings
 *      | DurationRange
 *      | TimePointRange
 *      | RecurrenceRange`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ContainedSubtype, // INCLUDES Type (Includes SHOULD be optional.)
        parserFor.PermittedAlphabet, // FROM
        parserFor.SizeConstraint, // SIZE
        parserFor.InnerTypeConstraints, // WITH COMPONENTS
        parserFor.PatternConstraint, // PATTERN
        parserFor.PropertySettings, // SETTINGS simplestring
        parserFor.ValueRange,
        parserFor.TypeConstraint, // This should be near the end of the list, because it is just Type.
        parserFor.SingleValue, // This must be at the end, because it is just Value.
        // These will never be read, because they are identical to ValueRange.
        parserFor.DurationRange,
        parserFor.TimePointRange,
        parserFor.RecurrenceRange,
      ],
      ProductionType.SubtypeElements
    )
);
