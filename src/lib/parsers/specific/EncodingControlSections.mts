import {
  optional,
  recursiveParser,
  whitespaceDelimitedList,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EncodingControlSections ::= EncodingControlSection EncodingControlSections | empty`
 */
export const EncodingControlSections: Parser = recursiveParser(
  (): Parser =>
    optional(
      whitespaceDelimitedList(
        ProductionType.EncodingControlSection,
        parserFor.EncodingControlSection
      )
    )
);
export default EncodingControlSections;
