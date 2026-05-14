import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
