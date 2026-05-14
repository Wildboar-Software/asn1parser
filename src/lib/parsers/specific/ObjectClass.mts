import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectClass ::= DefinedObjectClass | ObjectClassDefn | ParameterizedObjectClass`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedObjectClass,
        parserFor.DefinedObjectClass,
        parserFor.ObjectClassDefn,
      ],
      ProductionType.ObjectClass
    )
);
