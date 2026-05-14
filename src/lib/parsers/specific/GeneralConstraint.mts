import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
