import { choiceOf, recursiveParser, when, peekNextNonWhitespaceType } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `ReferencedValue ::= DefinedValue | ValueFromObject`
 */
export const ReferencedValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        when((state: ParseContext): boolean => {
          const next = peekNextNonWhitespaceType(state);
          return (
            next === ProductionType.period ||
            next === ProductionType.curlyOpening
          );
        }, parserFor.ValueFromObject),
        parserFor.DefinedValue,
      ],
      ProductionType.ReferencedValue
    )
);
export default ReferencedValue;
