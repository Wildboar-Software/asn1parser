import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 */
const SingularSettingParser = recursiveParser(
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

/**
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 */
const PluralSettingParser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ObjectSet,
        parserFor.Type,
        parserFor.Value,
        parserFor.ValueSet,
        parserFor.Object,
      ],
      ProductionType.Setting
    )
);

export default new Parser(
  (): string => 'Setting',
  (state: ParseContext): ParseContext =>
    state.justParsedPluralLiteral
      ? PluralSettingParser.execute(state)
      : SingularSettingParser.execute(state)
);
