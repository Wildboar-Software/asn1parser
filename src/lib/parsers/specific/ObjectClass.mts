import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectClass ::= DefinedObjectClass | ObjectClassDefn | ParameterizedObjectClass`
 */
export const ObjectClass: Parser = recursiveParser(
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
export default ObjectClass;
