import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.Type,
        parserFor.Value,
        parserFor.ValueSet,
        parserFor.Object,
        parserFor.ObjectSet,
      ],
      ProductionType.Setting
    )
);
