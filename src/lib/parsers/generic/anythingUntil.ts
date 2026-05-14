import Parser from '../../Parser.js';
import type ParseContext from '../../interfaces/ParseContext.js';
import Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import anythingExcept from './anythingExcept.js';

/**
 * @summary Produce a `Parser` that will parse any tokens until an exception.
 * @description
 * This parser will attempt to parse the next token with `exception` first.
 * As long as that fails, the generated parser will continue to consume tokens.
 * @param {Parser} exception The parser whose success will cause this parser to
 *  error.
 * @returns {Parser} The parser that will read any tokens until an exception.
 */
export default function (
  containingType: ProductionType,
  terminator: Parser
): Parser {
  return new Parser(
    () => `${containingType} / Anything Until ${terminator}`,
    (state: ParseContext): ParseContext => {
      const children: Production[] = [];
      let prevState: ParseContext = state;
      let nextState: ParseContext = anythingExcept(terminator).execute(state);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        nextState = anythingExcept(terminator).execute(prevState);
        if (nextState.error) {
          state.log.debug(
            `Read ${containingType} terminator ${terminator.name()}.`
          );
          break; // Error means that we encountered the terminator.
        } else {
          children.push(nextState.cst);
        }
        prevState = nextState;
      }
      return {
        ...state,
        index: nextState.index,
        cst: new Production(containingType, children, {
          ...state.cst.location,
          endIndex: nextState.cst.location.endIndex,
        }),
      };
    }
  );
}
