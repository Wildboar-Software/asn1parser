import type ParseContext from '../../interfaces/ParseContext.mjs';
import Parser from '../../Parser.mjs';

/**
 * @summary Do something when a parser parses successfully.
 * @description
 * A `Parser` generated with this factory will call the `callback`, passing in
 * the parser state as the first an only argument, when the parser indicated by
 * the `parser` argument parses successfully.
 *
 * Whether the `Parser` given by the `parser` parameter fails or not, this
 * will return its resulting state. This function does not manipulate the
 * parser state resulint from `parser` at all.
 *
 * @param {Parser} parser The `Parser` whose success will trigger the callback.
 * @param callback The action to be taken when the `parser` succeeds.
 * @returns {Parser} A `Parser` that will call the callback when the
 *  parameter `Parser` succeeds.
 */
export default function (
  parser: Parser,
  callback: (state: ParseContext) => void
): Parser {
  return new Parser(
    () => 'Do-If Callback',
    (state: ParseContext): ParseContext => {
      const result = parser.execute(state);
      if (!result.error) {
        callback(state);
      }
      return result;
    }
  );
}
