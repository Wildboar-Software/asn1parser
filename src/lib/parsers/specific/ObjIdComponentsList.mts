import {
  recursiveParser,
  whitespaceOptionalDelimitedList,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjIdComponentsList ::= ObjIdComponents | ObjIdComponents ObjIdComponentsList`
 */
export const ObjIdComponentsList: Parser = recursiveParser(
  (): Parser =>
    whitespaceOptionalDelimitedList(
      ProductionType.ObjIdComponentsList,
      parserFor.ObjIdComponents
    )
);
export default ObjIdComponentsList;
