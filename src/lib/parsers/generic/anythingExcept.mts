import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import anything from './anything.mjs';

/**
 * @summary Produce a `Parser` that will parse one token with an exception.
 * @description
 * This parser will attempt to parse the next token with `exception` first.
 * As long as that fails, this parser will consume that token and succeed.
 * @param {Parser} exception The parser whose success will cause this parser to
 *  error.
 * @returns {Parser} The parser
 */
export const anythingExcept = function (exception: Parser): Parser {
  return new Parser(
    () => `Anything except ${exception.name()}`,
    (state: ParseContext): ParseContext => {
      const result: ParseContext = exception.execute(state);
      if (result.error) {
        return anything.execute(state);
      } else {
        return {
          ...state,
          error: true,
        };
      }
    }
  );
}
;
export default anythingExcept;
