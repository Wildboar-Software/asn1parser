import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import anythingExcept from './anythingExcept.mjs';

function locationAtCursor(
  state: ParseContext,
  zeroWidth: boolean
): ParseContext['cst']['location'] | undefined {
  const token = state.tokens[state.index];
  if (token) {
    return zeroWidth
      ? {
          ...token.location,
          endIndex: token.location.startIndex,
        }
      : token.location;
  }
  const last = state.tokens[state.tokens.length - 1];
  if (!last) {
    return undefined;
  }
  return {
    ...last.location,
    startIndex: last.location.endIndex,
    endIndex: last.location.endIndex,
  };
}

/**
 * @summary Produce a `Parser` that will parse any tokens until a terminator.
 * @description
 * Consumes tokens one at a time while `terminator` does not match. When
 * `terminator` matches, this parser succeeds and leaves that token unconsumed
 * so a parent can parse it.
 *
 * End of input is **not** treated as the terminator. If `terminator` never
 * matches, this parser fails after consuming every remaining token. Callers
 * that use this for error recovery (such as `assert`) may then clear `error`
 * and keep the advanced index.
 *
 * @param {ProductionType} containingType The type of the `Production` that
 *  will subsume the consumed tokens.
 * @param {Parser} terminator The parser whose success stops consumption.
 * @returns {Parser} The parser that will read any tokens until the terminator.
 */
export const anythingUntil = function (
  containingType: ProductionType,
  terminator: Parser
): Parser {
  return new Parser(
    () => `${containingType} / Anything Until ${terminator.name()}`,
    (state: ParseContext): ParseContext => {
      const children: Production[] = [];
      let prevState: ParseContext = state;
      while (prevState.index < prevState.tokens.length) {
        const nextState: ParseContext =
          anythingExcept(terminator).execute(prevState);
        if (nextState.error) {
          state.log.debug(
            `Read ${containingType} terminator ${terminator.name()}.`
          );
          return {
            ...state,
            index: prevState.index,
            cst: new Production(
              containingType,
              children,
              children.length
                ? undefined
                : locationAtCursor(state, false)
            ),
          };
        }
        children.push(nextState.cst);
        prevState = nextState;
      }
      state.log.debug(
        `Did not read ${containingType} terminator ${terminator.name()} before end of input.`
      );
      return {
        ...state,
        error: true,
        index: prevState.index,
        cst: new Production(
          containingType,
          children,
          children.length ? undefined : locationAtCursor(state, true)
        ),
      };
    }
  );
}
;
export default anythingUntil;
