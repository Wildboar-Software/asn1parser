import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * @summary Generate a parser that may be defined in terms of itself.
 * @description
 * This is to prevent issues with looping / self-referential definitions.
 *
 * The getter is resolved once and reused. Stable parser identity is required
 * for packrat memoization in `Parser.execute`: a new `choiceOf` on every
 * call would never hit the table.
 *
 * @param parserGetter A callback that returns a `Parser`.
 * @returns {Parser} A `Parser` that, only upon execution, will resolve the
 *  constituent parsers that compose its definition.
 * @function
 */
export const recursiveParser = function (parserGetter: () => Parser): Parser {
  let resolved: Parser | undefined;
  const get = (): Parser => (resolved ??= parserGetter());
  return new Parser(
    () => get().name(),
    (state: ParseContext): ParseContext => get().execute(state),
    true
  );
}
;
export default recursiveParser;
