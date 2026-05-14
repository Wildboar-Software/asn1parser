import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjIdComponents ::= NameForm | NumberForm | NameAndNumberForm | DefinedValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.NameAndNumberForm,
        parserFor.NameForm,
        parserFor.NumberForm,
        parserFor.DefinedValue,
      ],
      ProductionType.ObjIdComponents
    )
);
