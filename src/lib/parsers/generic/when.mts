import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import { failParse } from './tokenPeek.mjs';

/**
 * @summary Run `parser` only when `predicate` is true.
 * @description
 * Used to skip doomed alternatives (for example `TypeWithConstraint` when the
 * next token is `{` rather than `SIZE` / `(`) without executing them.
 *
 * @param predicate Return true to attempt `parser`.
 * @param parser The parser to attempt when the predicate holds.
 * @returns A parser that fails immediately when the predicate is false.
 */
export const when = function (
  predicate: (state: ParseContext) => boolean,
  parser: Parser
): Parser {
  return new Parser(
    () => parser.name(),
    (state: ParseContext): ParseContext => {
      if (!predicate(state)) {
        return failParse(state);
      }
      return parser.execute(state);
    }
  );
};

export default when;
