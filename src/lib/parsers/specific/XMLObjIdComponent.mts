import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
