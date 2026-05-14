import {
  recursiveParser,
  whitespaceOptionalDelimitedList,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeOIDComponentsList ::= RelativeOIDComponents | RelativeOIDComponents RelativeOIDComponentsList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceOptionalDelimitedList(
      ProductionType.RelativeOIDComponentsList,
      parserFor.RelativeOIDComponents
    )
);
