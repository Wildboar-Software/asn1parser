import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * @summary Generate a parser that may be defined in terms of itself.
 * @description
 * This is to prevent issues with looping / self-referential definitions.
 * @param parserGetter A callback that returns a `Parser`.
 * @returns {Parser} A `Parser` that, only upon execution, will resolve the
 *  constituent parsers that compose its definition.
 * @function
 */
export default function (parserGetter: () => Parser): Parser {
  return new Parser(
    () => parserGetter().name(),
    (state: ParseContext): ParseContext => parserGetter().execute(state)
  );
}
