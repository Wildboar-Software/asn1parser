import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TableConstraint ::= SimpleTableConstraint | ComponentRelationConstraint`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.ComponentRelationConstraint, parserFor.SimpleTableConstraint],
      ProductionType.TableConstraint
    )
);
