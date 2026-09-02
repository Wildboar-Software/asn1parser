import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import LogLevel from '../../LogLevel.mjs';
import { failParse } from './tokenPeek.mjs';

/**
 * @summary Map from the current token type to the alternative(s) that can match.
 */
export type TokenParserTable = {
  [tokenType: string]: Parser | readonly Parser[] | undefined;
};

/**
 * @summary `choiceOf` that looks at the current token instead of trying every alt.
 * @description
 * Alternatives whose FIRST set cannot include the current token are not
 * executed. Success wrapping matches `choiceOf`: the child’s CST is subsumed
 * by `containingType` when that is set, and `currentType` is taken from the
 * incoming state.
 *
 * @param table Token type to parser (or ordered parsers that share a FIRST).
 * @param containingType Optional parent production type.
 * @returns A parser that fails when the current token has no mapping.
 */
export const dispatchOnToken = function (
  table: TokenParserTable,
  containingType?: ProductionType
): Parser {
  return new Parser(
    () => `${containingType || 'TokenDispatch'}`,
    (state: ParseContext): ParseContext => {
      const mapped = table[state.tokens[state.index].type];
      if (!mapped) {
        return failParse(state, containingType || ProductionType.empty);
      }
      const alts: readonly Parser[] = Array.isArray(mapped) ? mapped : [mapped];
      for (const labeledParser of alts) {
        const result = labeledParser.execute(state);
        if (!result.error) {
          if (
            containingType !== ProductionType.whitespace &&
            state.log.level <= LogLevel.info
          ) {
            state.log.info(
              `Read ${containingType || 'TokenDispatch'} alternative ${labeledParser.name()}.`
            );
          }
          return {
            ...result,
            currentType: state.currentType,
            cst: containingType
              ? new Production(containingType, [result.cst])
              : result.cst,
          };
        }
      }
      return failParse(state, containingType || ProductionType.empty);
    }
  );
};

export default dispatchOnToken;
