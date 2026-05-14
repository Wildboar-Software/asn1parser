import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLObjIdComponent ::= NameForm | XMLNumberForm | XMLNameAndNumberForm`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.NameForm,
        parserFor.XMLNumberForm,
        parserFor.XMLNameAndNumberForm,
      ],
      ProductionType.XMLObjIdComponent
    )
);
