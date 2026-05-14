import {
  recursiveParser,
  whitespaceOptionalDelimitedList,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
