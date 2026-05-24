import literal from '../generic/literal.mjs';
import choiceOf from '../generic/choiceOf.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

/**
 * `Reference ::=
 *     typereference
 *     | valuereference
 *     | objectclassreference
 *     | objectreference
 *     | objectsetreference`
 */
export const Reference: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.objectclassreference),
        parserFor.typereference,
        parserFor.valuereference,
        parserFor.objectreference,
        parserFor.objectsetreference,
      ],
      ProductionType.Reference
    )
);
export default Reference;
