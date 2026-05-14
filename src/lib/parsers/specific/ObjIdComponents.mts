import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
