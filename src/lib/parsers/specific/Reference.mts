import literal from '../generic/literal.js';
import choiceOf from '../generic/choiceOf.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * `Reference ::=
 *     typereference
 *     | valuereference
 *     | objectclassreference
 *     | objectreference
 *     | objectsetreference`
 */
export default recursiveParser(
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
