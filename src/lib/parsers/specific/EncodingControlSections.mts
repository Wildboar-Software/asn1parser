import {
  optional,
  recursiveParser,
  whitespaceDelimitedList,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EncodingControlSections ::= EncodingControlSection EncodingControlSections | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceDelimitedList(
        ProductionType.EncodingControlSection,
        parserFor.EncodingControlSection
      )
    )
);
