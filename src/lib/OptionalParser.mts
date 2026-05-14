import type ParseContext from './interfaces/ParseContext.mjs';
import Parser from './Parser.mjs';

/**
 * @summary A `Parser` that tolerates reading out-of-bounds.
 * @description
 * The only meaningful way that this differs from `Parser` is that it does not
 * append an error to the parser state if an out-of-bounds read occurs.
 * @class
 */
export default class OptionalParser extends Parser {
  /**
   * @summary Parse, starting with the given state.
   * @description
   * Attempts to parse by calling the underlying parsing function, starting
   * from the token indicated by `state.tokens[state.index]`.
   * @param {ParseContext} state The state from which to begin parsing.
   * @returns {ParseContext} The updated state of parsing.
   * @public
   * @method
   */
  public override execute(state: ParseContext): ParseContext {
    if (state.error) {
      return state;
    }
    if (state.index >= state.tokens.length) {
      return {
        ...state,
      };
    }
    return this.executor(state);
  }
}
