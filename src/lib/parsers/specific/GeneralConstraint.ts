import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `GeneralConstraint ::= UserDefinedConstraint | TableConstraint | ContentsConstraint`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.UserDefinedConstraint,
        parserFor.ContentsConstraint,
        parserFor.TableConstraint,
      ],
      ProductionType.GeneralConstraint
    )
);
